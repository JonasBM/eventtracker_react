import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";
import moment from "moment";

import {
  updateImovel,
  updateImovelLog,
} from "../../actions/imovel/actionImovel";

const FormUpdateImovel = () => {
  const dispatch = useDispatch();
  const updatelog = useSelector((state) => state.imovel.updatelog);
  const onSubmit = (values) => {
    dispatch(updateImovel(values));
    dispatch(updateImovelLog());
  };

  return (
    <Form
      initialValues={{
        check: "",
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h5>{"Atualizar lista de imóveis"}</h5>
          <div className="form-inline">
            <InputFormGroup
              name="check"
              label="Data: "
              className="m-1"
              validate={required}
            />
          </div>
          <span style={{ color: "red" }}>
            Obs.: O processo leva vários minutos para completar, esta ferramenta
            não deve ser utilizado com frequencia.
            <br />
            Escreva a data de hoje no formato "{moment().format("YYYY-MM-DD")}".
          </span>
          <div className="form-inline">
            <button
              type="submit"
              className="btn btn-primary font-weight-bold m-2"
            >
              Atualizar
            </button>
          </div>

          {updatelog && (
            <ul className="list-group p-1 m-2 border">
              <li className="list-group-item p-0 border-0">
                Último Log: {updatelog.datetime}
              </li>
              <li className="list-group-item p-0 border-0">
                {updatelog.status}
                {": "}
                {updatelog.response}
              </li>
              <li className="list-group-item p-0 border-0">
                Total: {updatelog.total} / Inalterados: {updatelog.inalterados}{" "}
                / Alterados: {updatelog.alterados} / Novos: {updatelog.novos}
              </li>
            </ul>
          )}
        </form>
      )}
    />
  );
};

export default FormUpdateImovel;
