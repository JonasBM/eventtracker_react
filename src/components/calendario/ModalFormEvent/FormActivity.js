import React, { useState, useEffect } from "react";

const FormActivity = ({ activity }) => {
  const [state, setState] = useState({
    date: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    if (activity) {
      setState(activity);
    }
  }, [activity]);

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };

  return (
    <form method="post" className="needs-validation" noValidate>
      <div className="modal-body container">
        <div className="container">
          <div className="container">
            <div className="form-group">
              <label htmlFor="id_activity-date">data:</label>{" "}
              <input
                type="date"
                className="form-control form-control-sm"
                id="id_activity-date"
                onChange={handleChange}
                value={state.date}
              />
            </div>

            <div className="form-group">
              <label htmlFor="id_activity-description">descrição:</label>{" "}
              <textarea
                cols="40"
                rows="20"
                className="form-control form-control-sm"
                id="id_activity-description"
                onChange={handleChange}
                value={state.description}
              ></textarea>
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

export default FormActivity;
