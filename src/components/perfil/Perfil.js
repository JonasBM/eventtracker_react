import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCRUDUserProfile } from "../../actions/user/actionUserProfile";
import { logoutAll } from "../../actions/actionAuth";
import FormChangePassword from "./FormChangePassword";
import FormUserData from "./FormUserData";
import FormReportPDF from "./FormReportPDF";
import FormSheetCSV from "./FormSheetCSV";
import { actionCRUDUser } from "../../actions/user/actionUser";
import FormUpdateImovel from "./FormUpdateImovel";
import { updateImovelLog } from "../../actions/imovel/actionImovel";

const Perfil = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDUserProfile.read());
    dispatch(updateImovelLog());
    let intervalId = setInterval(() => {
      dispatch(updateImovelLog());
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const handleLogoutAll = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria sair de todas as Instâncias?";
    confirm_alert += newLine;
    confirm_alert += "Você terá que entrar novamente em todos os dispositivos.";
    if (window.confirm(confirm_alert)) {
      dispatch(logoutAll());
    }
  };

  return (
    <div className="modal-body container">
      <div className="row">
        <div className="col-12 offset-lg-1 col-lg-4">
          <h5>
            {"Bem vindo, "}
            {authUser
              ? authUser.first_name
                ? authUser.first_name
                : authUser.username
              : ""}
            {"!"}
          </h5>
          <h6>
            {" (último login: "}
            {authUser ? authUser.last_login : ""}
            {")"}
          </h6>
          <div>
            <FormUserData authUser={authUser} />
          </div>

          <div className="mt-2">
            <FormChangePassword authUser={authUser} />
          </div>
        </div>
        <div className="col-12 offset-lg-1 col-lg-4 mt-2 mt-lg-0">
          <div className="row m-1 p-2 border">
            <FormReportPDF />
          </div>
          <div className="row m-1 p-2 border">
            <FormSheetCSV />
          </div>

          <div className="row m-1 p-2">
            <button
              type="button"
              className="btn btn-primary font-weight-bold mt-2"
              onClick={handleLogoutAll}
            >
              Sair de todos os locais
            </button>
          </div>
        </div>
      </div>
      {authUser && authUser.is_staff && (
        <div className="row mt-3 m-1 p-2 border">
          <FormUpdateImovel />
        </div>
      )}
    </div>
  );
};

export default Perfil;
