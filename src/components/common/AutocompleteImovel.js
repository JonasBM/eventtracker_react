import React, { useState, useEffect } from "react";
import { Field } from "react-final-form";
import { Error, InputFormGroup } from "./Forms";
import "./AutocompleteImovel.css";
import { useDispatch, useSelector } from "react-redux";
import formatString from "format-string-by-pattern";
import { actionCRUDImovel } from "../../actions/imovel/actionImovel";
import { OnFocus, OnBlur, OnChange } from "react-final-form-listeners";
import {
  GeoItajaiButton,
  GeoItajaiAlvaraButton,
  IconButton,
  MapButton,
} from "../calendario/common";
import debounce from "lodash.debounce";
import axios from "axios";
import { createMessage } from "../../actions/actionMessages";

export const SearchFromString = (value, imovel_id = null) => {
  let all = /^[\d.]+-(.+)$/g;
  // let address = /^[^-]+$/g;
  let codigo_insc = /^[\d.]+$/g;

  let bairro = "";
  let complemento = "";
  let number = "";
  let street = "";
  let codigo = "";
  let inscricao_imobiliaria = "";

  if (all.test(value)) {
    let minusIndex = value.indexOf("-");
    codigo = value.slice(0, minusIndex).trim();
    street = value.slice(minusIndex + 1).trim();
  } else {
    if (codigo_insc.test(value)) {
      codigo = value;
    } else {
      street = value;
    }
  }

  if (codigo) {
    codigo = codigo.replace(/\D/g, "");
    inscricao_imobiliaria = formatString("999.999.99.9999.9999.999", codigo);
  }
  if (street) {
    let lastMinusIndex = street.lastIndexOf("-");

    if (lastMinusIndex > 0) {
      bairro = street.slice(lastMinusIndex + 1).trim();
      street = street.slice(0, lastMinusIndex).trim();
    }
    let firstCommaIndex = street.indexOf(",");
    if (firstCommaIndex > 0) {
      number = street.slice(firstCommaIndex + 1);
      let secondCommaIndex = number.indexOf(",");
      if (secondCommaIndex > 0) {
        complemento = number.slice(secondCommaIndex + 1).trim();
        number = number.slice(0, secondCommaIndex);
      }
      //number = number.replace(/(?<!\/)[nN]|[º°]/g, "").trim();
      if (!number.includes("s/n")) {
        number = number.replace(/[nN]|[º°]/g, "").trim();
      } else {
        number = number.trim();
      }
      //number = number.trim();
      street = street.slice(0, firstCommaIndex).trim();
    }
  }

  return {
    id: imovel_id,
    bairro: bairro,
    complemento: complemento,
    number: number,
    street: street,
    codigo: codigo,
    inscricao_imobiliaria: inscricao_imobiliaria,
  };
};

const AutocompleteImovel = ({
  name,
  name_string,
  label,
  form,
  className,
  showResult = true,
  ...props
}) => {
  const dispatch = useDispatch();
  const imoveis = useSelector((state) => state.imovel.imoveis.imoveis);
  const [currentImovel, setCurrentImovel] = useState();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  //const [blurTimer, setBlurTimer] = useState(null);

  const [showNewCEP, setShowNewCEP] = useState(false);
  const [logradouroBusca, setLogradouroBusca] = useState("");
  const [CEPResults, setCEPResults] = useState();

  useEffect(() => {
    setCurrentImovel(form.getFieldState(name).value);
    if (form.getFieldState(name_string).pristine) {
      setShowAutocomplete(false);
    }
  }, [form, name, name_string]);

  const ImovelSearch = (value) => {
    if (form.getFieldState(name).value) {
      let params = SearchFromString(value, form.getFieldState(name).value.id);
      dispatch(actionCRUDImovel.read(params));
    }
  };

  const handleValueChange = (value, previous) => {
    if (value.length > 3) {
      const debouncedSave = debounce(() => ImovelSearch(value), 500);
      debouncedSave();
      handleFocus(true);
    } else {
      handleFocus(false);
    }
    if (value.length === 0) {
      form.mutators.setValue(name, null);
    }
  };

  const handleFocus = (value) => {
    if (
      value &&
      form.getFieldState(name_string).value !== undefined &&
      form.getFieldState(name_string).value.length > 3
    ) {
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleImovelChoose = (event) => {
    handleFocus(false);
    setShowNewCEP(false);
    if (imoveis) {
      form.mutators.setValue(
        name,
        imoveis.find(
          (imovel) => imovel.id.toString() === event.target.dataset.imovel_id
        )
      );
      form.mutators.setValue(name + "_id", event.target.dataset.imovel_id);
    }
  };

  const handleBuscaCEP = () => {
    const header = {
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      params: { uf: "SC", localidade: "Itajai", logradouro: logradouroBusca },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "api/buscacep/", header)
      .then((res) => {
        if (res.data.total > 0) {
          setCEPResults(res.data.dados);
        } else {
          dispatch(createMessage({ INFO: res.data.mensagem }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveCEP = () => {
    if (form.getFieldState("newCEP")) {
      form.mutators.setValue(
        name + ".cep",
        formatString("99.999-999", form.getFieldState("newCEP").value)
      );
      dispatch(actionCRUDImovel.update(form.getFieldState(name).value));
    }
    setShowNewCEP(false);
  };

  if (className !== undefined) {
    className += " form-control form-control-sm";
  } else {
    className = "form-control form-control-sm";
  }

  return (
    <div className="form-group mb-0">
      {label && (
        <label htmlFor={"id_" + name} className="mb-0">
          {label}{" "}
          <i
            className="fa fa-question fa-sm"
            aria-hidden="true"
            title='Digite o codigo do imovel, insc. imobiliária, ou endereço &#013; ex.: &#013; endereço: "logradouro,numero,complemento-bairro" &#013; codigo do imóvel: "123456" &#013; insc. imobiliária (com ou sem pontos): "123.456..." &#013; Após terminar de digitar espere por meio segundo para a pesquisar ser realizada'
          />
        </label>
      )}

      <div className="autocomplete">
        <Field
          component="input"
          type="text"
          {...props}
          className={className}
          id={"id_" + name_string}
          name={name_string}
          autoComplete="off"
        />
        <OnChange name="imovel.name_string">
          {(value, previous) => {
            handleValueChange(value, previous);
          }}
        </OnChange>
        <OnFocus name="imovel.name_string">
          {() => {
            handleFocus(true);
          }}
        </OnFocus>
        <OnBlur name="imovel.name_string">
          {() => {
            handleFocus(false);
          }}
        </OnBlur>
        <Field component="input" type="hidden" id={"id_" + name} name={name} />
        <div className={showAutocomplete ? "autocomplete-items" : "d-none"}>
          {imoveis &&
            imoveis.map((imovel, index) => (
              <div
                role="button"
                key={index}
                data-imovel_id={imovel.id}
                data-imovel_value={imovel.name_string}
                onMouseDown={handleImovelChoose}
                //onClick={handleImovelChoose}
                className={
                  currentImovel
                    ? imovel.name_string === currentImovel.name_string
                      ? "autocomplete-active"
                      : ""
                    : ""
                }
              >
                {imovel.name_string}
              </div>
            ))}
        </div>
      </div>
      <Error name={name_string} />
      {showResult && currentImovel && (
        <ul className="list-group p-1 m-2 autocomplete-resultlist border">
          <li className="list-group-item p-0 border-0">
            razao_social: {currentImovel.razao_social}
          </li>
          <li className="list-group-item p-0 border-0">
            Código do imóvel: {currentImovel.codigo}
          </li>
          <li className="list-group-item p-0 border-0">
            Insc. Imobiliária: {currentImovel.inscricao_imobiliaria}
          </li>
          <li className="list-group-item p-0 border-0">
            Contribuinte: {currentImovel.numero_contribuinte}
          </li>
          <li className="list-group-item p-0 border-0">
            Endereço: {currentImovel.logradouro + ", " + currentImovel.numero}
            {currentImovel.complemento ? ", " + currentImovel.complemento : ""}
            {" - "}
            Bairro: {currentImovel.bairro}
            {" - "}CEP:{" "}
            {currentImovel.cep && formatString("99.999-999", currentImovel.cep)}
            <div className="row no-gutters d-inline-flex float-right">
              <IconButton
                icon={showNewCEP ? "fa-envelope-open-o" : "fa-envelope-o"}
                onclick={() => {
                  setLogradouroBusca(currentImovel.logradouro);
                  setCEPResults();
                  setShowNewCEP(!showNewCEP);
                  form.mutators.setValue(
                    "newCEP",
                    formatString("99.999-999", currentImovel.cep)
                  );
                }}
                title="Autalizar CEP"
              />
              <GeoItajaiButton codigo_lote={currentImovel.codigo_lote} />
              <GeoItajaiAlvaraButton codigo_lote={currentImovel.codigo_lote} />
              <MapButton
                address={
                  currentImovel.logradouro +
                  "," +
                  currentImovel.numero +
                  "-" +
                  currentImovel.bairro +
                  "-itajaí"
                }
              />
            </div>
          </li>
          <li className="list-group-item p-0 border-0">
            <div className={showNewCEP ? "collapse show p-1" : "collapse"}>
              <div className="card card-body d-block p-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  maxLength="255"
                  value={logradouroBusca}
                  placeholder="Logradouro sem número e sem bairro"
                  onChange={(event) => {
                    setLogradouroBusca(event.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm my-1"
                  onClick={() => {
                    handleBuscaCEP();
                  }}
                >
                  Buscar CEP <i className="fa fa-search"></i>
                </button>
                <div className="list-group border-0">
                  {CEPResults &&
                    CEPResults.map((result, index) => (
                      <button
                        type="button"
                        className="list-group-item list-group-item-action p-1 "
                        key={index}
                        onClick={() => {
                          form.mutators.setValue(
                            "newCEP",
                            formatString("99.999-999", result.cep)
                          );
                        }}
                      >
                        <span>
                          {result.logradouroDNEC}
                          {" - "}
                          {result.bairro}
                          {": "}
                          {result.cep}
                        </span>
                      </button>
                    ))}
                </div>
                <div className="form-inline">
                  <InputFormGroup
                    name="newCEP"
                    label="Novo CEP:"
                    maxLength="255"
                    className="m-1"
                    classNameDiv="mx-1"
                    parse={formatString("99.999-999")}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      handleSaveCEP();
                    }}
                  >
                    Salvar CEP
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AutocompleteImovel;
