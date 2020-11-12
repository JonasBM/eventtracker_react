import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCRUDUser } from "../../actions/user/actionUser";
import { logoutAll } from "../../actions/actionAuth";
import FormChangePassword from "./FormChangePassword";
import FormUserData from "./FormUserData";
import FormReportPDF from "./FormReportPDF";
import FormSheetCSV from "./FormSheetCSV";

const Perfil = () => {
  const dispatch = useDispatch();
  const authUserId = useSelector((state) => state.auth.userId);
  const currentUser = useSelector(
    (state) => state.user.users.users.filter((el) => el.id === authUserId)[0]
  );

  useEffect(() => {
    dispatch(actionCRUDUser.read());
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
            {currentUser
              ? currentUser.first_name
                ? currentUser.first_name
                : currentUser.username
              : ""}
            {"!"}
          </h5>
          <h6>
            {" (último login: "}
            {currentUser ? currentUser.last_login : ""}
            {")"}
          </h6>
          <div>
            <FormUserData currentUser={currentUser} />
          </div>

          <div className="mt-2">
            <FormChangePassword currentUser={currentUser} />
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
              Revogar todos os Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
