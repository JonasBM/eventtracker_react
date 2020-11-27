import React, { useState, useEffect, Fragment } from "react";
import { Field } from "react-final-form";
import { Error } from "./Forms";
import "./AutocompleteImovel.css";
import { useDispatch, useSelector } from "react-redux";
import formatString from "format-string-by-pattern";
import { actionCRUDImovel } from "../../actions/imovel/actionImovel";
import { OnFocus, OnBlur, OnChange } from "react-final-form-listeners";
import { GeoItajaiButton, MapButton } from "../calendario/common";
import { useCallback } from "react";
import debounce from "lodash.debounce";

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
      number = number.replace(/(?<!\/)[nN]|[º°]/g, "").trim();
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
  const [blurTimer, setBlurTimer] = useState(null);

  useEffect(() => {
    setCurrentImovel(form.getFieldState(name).value);
    if (form.getFieldState(name_string).pristine) {
      setShowAutocomplete(false);
    }
  }, [form, name, name_string]);

  const debouncedImovelSearch = useCallback(
    debounce((value) => {
      if (form.getFieldState(name).value) {
        let params = SearchFromString(value, form.getFieldState(name).value.id);
        dispatch(actionCRUDImovel.read(params));
      }
    }, 500),
    []
  );

  const handleValueChange = (value, previous) => {
    if (value.length > 3) {
      debouncedImovelSearch(value);
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
      clearTimeout(blurTimer);
      setShowAutocomplete(true);
    } else {
      setBlurTimer(
        setTimeout(() => {
          setShowAutocomplete(false);
        }, 100)
      );
    }
  };

  const handleImovelChoose = (event) => {
    handleFocus(false);
    form.mutators.setValue(
      name,
      imoveis.find(
        (imovel) => imovel.id.toString() === event.target.dataset.imovel_id
      )
    );
    form.mutators.setValue(name + "_id", event.target.dataset.imovel_id);
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
          {imoveis.map((imovel, index) => (
            <div
              key={index}
              data-imovel_id={imovel.id}
              data-imovel_value={imovel.name_string}
              onClick={handleImovelChoose}
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
          {currentImovel.lote ? (
            <Fragment>
              <li className="list-group-item p-0 border-0">
                Endereço:{" "}
                {currentImovel.lote.logradouro +
                  ", " +
                  currentImovel.lote.numero}
                {currentImovel.complemento
                  ? ", " + currentImovel.complemento
                  : ""}
                {" - "}
                Bairro: {currentImovel.lote.bairro}
                {" - "}CEP: {currentImovel.lote.CEP}
                <div className="row no-gutters d-inline-flex float-right">
                  <GeoItajaiButton codigo={currentImovel.lote.codigo} />
                  <MapButton
                    address={
                      currentImovel.lote.logradouro +
                      "," +
                      currentImovel.lote.numero +
                      "-" +
                      currentImovel.lote.bairro +
                      "-itajaí"
                    }
                  />
                </div>
              </li>
            </Fragment>
          ) : (
            ""
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteImovel;
