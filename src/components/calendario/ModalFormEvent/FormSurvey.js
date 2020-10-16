import React, { useState, useEffect } from "react";

const FormSurvey = ({ survey }) => {
  const [state, setState] = useState({
    date: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    if (survey) {
      setState(survey);
    }
  }, [survey]);

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };

  return (
    <form method="post" className="needs-validation" noValidate>
      <div className="modal-body container">
        <div className="container">
          <div className="form-group">
            <label htmlFor="id_survey-date">data:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="id_survey-date"
              onChange={handleChange}
              value={state.date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_survey-address">endereço:</label>{" "}
            <input
              type="text"
              className="form-control form-control-sm"
              maxLength="255"
              id="id_survey-address"
              onChange={handleChange}
              value={state.address}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_survey-description">descrição:</label>{" "}
            <textarea
              cols="40"
              rows="3"
              className="form-control form-control-sm"
              id="id_survey-description"
              onChange={handleChange}
              value={state.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="id_survey-identification">identificação:</label>{" "}
            <input
              type="text"
              className="form-control form-control-sm"
              maxLength="255"
              id="id_survey-identification"
              onChange={handleChange}
              value={state.identification}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_survey-survey_event_type">tipo:</label>{" "}
            <select
              className="form-control form-control-sm"
              required=""
              id="id_survey-survey_event_type"
            >
              <option value="">---------</option>
              <option value="1">1-Habite-se</option>
              <option value="2">2-Licença de Reforma</option>
              <option value="3">3-Licença de Demolição</option>
              <option value="4">4-Renovação da Licença de Construção</option>
              <option value="5">5-Empresa</option>
              <option value="6">6-Denuncia MP</option>
              <option value="7">7-Denuncia Cidadão</option>
              <option value="8">8-Obras</option>
            </select>
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                name="survey-concluded"
                className="custom-control-input"
                id="id_survey-concluded"
              />
              <label
                className="custom-control-label"
                htmlFor="id_survey-concluded"
              >
                concluído
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="mr-auto btn btn-danger font-weight-bold"
        >
          Deletar
        </button>
        <button
          type="button"
          className="btn btn-secondary font-weight-bold"
          data-dismiss="modal"
        >
          Fechar
        </button>
        <button type="submit" className="btn btn-primary font-weight-bold">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default FormSurvey;
