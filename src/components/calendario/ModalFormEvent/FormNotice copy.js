import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../hooks/input-hook";
import { actionCRUDNotice } from "../../../actions/notice/actionNotice";

import { Form, Field } from "react-final-form";

const FormNoticeEvent = ({ notice_event }) => {
  const [state, setState] = useState({ ...notice_event });

  const handleChange = (e) => {
    setState({
      ...notice_event,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <input
      type="text"
      className="form-control form-control-sm mx-1"
      placeholder="identificação"
      size="15"
      maxLength="255"
      id="id_notice_event-1-identification"
      name="identification"
      onChange={handleChange}
      value={notice_event.identification || ""}
    />
  );
};

const FormNotice = ({ notice }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ ...notice, notice_events: [] });

  useEffect(() => {
    if (notice) {
      setState({ ...notice });
    }
  }, [notice]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    notice = state;
    dispatch(actionCRUDNotice.update(notice));
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="modal-body container">
        <div className="container">
          <div className="form-group">
            <label htmlFor="id_notice-date">data:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="id_notice-date"
              name="date"
              onChange={handleChange}
              value={state.date || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_notice-address">endereço:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              maxLength="255"
              id="id_notice-address"
              name="address"
              onChange={handleChange}
              value={state.address || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_notice-description">descrição:</label>
            <textarea
              cols="40"
              rows="3"
              className="form-control form-control-sm"
              id="id_notice-description"
              name="description"
              onChange={handleChange}
              value={state.description || ""}
            ></textarea>
          </div>
          <div className="container">
            {state.notice_events.map((notice_event) => (
              <FormNoticeEvent
                key={"formnoticeevent" + notice_event.id}
                notice_event={notice_event}
              />
            ))}
          </div>

          <div className="container" name="notice_event_formset">
            <hr />
            <div className="row text-center">
              <span
                className="col text-uppercase w-100 font-weight-bold text-nowrap"
                id="id_notice_event-1-TYPE"
              >
                Infração
              </span>
              <input
                type="hidden"
                name="notice_event-1-notice_event_type"
                value="2"
                id="id_notice_event-1-notice_event_type"
              />

              <div className="col custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="notice_event-1-SAVE"
                  id="id_notice_event-1-SAVE"
                />
                <label
                  className="custom-control-label"
                  htmlFor="id_notice_event-1-SAVE"
                >
                  Possui
                </label>
              </div>
            </div>

            <div id="id_notice_event-1-collapse" className="row collapse">
              <div className="row pr-1 pb-1 w-100">
                <div className="col form-inline">
                  <label htmlFor="id_notice_event-1-identification">nº:</label>
                  <input
                    type="text"
                    name="notice_event-1-identification"
                    className="form-control form-control-sm mx-1"
                    placeholder="identificação"
                    size="15"
                    maxLength="255"
                    id="id_notice_event-1-identification"
                    value=""
                  />
                  <div className="invalid-feedback">Fornecer Auto</div>

                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      name="notice_event-1-end_concluded"
                      className="custom-control-input"
                      id="id_notice_event-1-end_concluded"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="id_notice_event-1-end_concluded"
                    >
                      concluído
                    </label>
                  </div>
                </div>
              </div>

              <div className="row pr-1 pb-1 w-100">
                <div className="col form-inline">
                  <label htmlFor="id_notice_event-1-deadline">
                    prazo (dias):
                  </label>
                  <input
                    type="text"
                    name="notice_event-1-deadline"
                    value="10"
                    className="form-control form-control-sm mx-1"
                    placeholder="prazo"
                    size="4"
                    required=""
                    id="id_notice_event-1-deadline"
                  />

                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      name="notice_event-1-deadline_working_days"
                      className="custom-control-input"
                      id="id_notice_event-1-deadline_working_days"
                      checked=""
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="id_notice_event-1-deadline_working_days"
                    >
                      apenas dias úteis
                    </label>
                  </div>
                </div>
              </div>

              <div className="row pr-1 pb-1 w-100 justify-content-center">
                <input
                  type="hidden"
                  id="id_notice_fine-pk"
                  name="notice_fine-pk"
                  value="0"
                />
                <div className="row form-inline">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="notice_fine-FINE"
                      id="id_notice_fine-FINE"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="id_notice_fine-FINE"
                    >
                      Lançar multa
                    </label>
                  </div>
                </div>
                <div
                  id="id_notice_fine-collapse"
                  className="row px-4 form-inline collapse"
                >
                  <label htmlFor="id_notice_fine-identification">nº:</label>
                  <input
                    type="text"
                    name="notice_fine-identification"
                    className="form-control form-control-sm mx-1"
                    placeholder="identificação"
                    maxlength="255"
                    id="id_notice_fine-identification"
                    value=""
                  />
                  <label htmlFor="id_notice_fine-date">data:</label>
                  <input
                    type="date"
                    name="notice_fine-date"
                    value="2020-10-09"
                    className="form-control form-control-sm mx-1"
                    required=""
                    id="id_notice_fine-date"
                  />
                  <input
                    type="hidden"
                    name="initial-notice_fine-date"
                    value="2020-10-09 19:45:26+00:00"
                    id="initial-notice_fine-id_notice_fine-date"
                  />
                </div>
              </div>
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

export default FormNotice;
