import React, { useEffect, useState } from "react";
import { login, logout } from "../../actions/actionAuth";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useInput } from "../../hooks/input-hook";

const Login = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoging, setIsLoging] = useState(false);
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useInput("");

  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  useEffect(() => {
    if (auth.isAuthenticated && !isLoging) {
      dispatch(logout());
    } else if (auth.isAuthenticated && isLoging) {
      history.push("/");
    }
  }, [dispatch, auth, isLoging, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    resetUsername();
    resetPassword();
    setIsLoging(true);
  };

  return (
    <div className="h-100 v-100 d-grid justify-content-center pt-2 pt-lg-5">
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="mb-lg-3 row">
          <h3 className="mb-lg-3 font-weight-normal">Acesso restrito</h3>
        </div>
        <div className="mb-lg-3 row">
          <label htmlFor="staticEmail" className="col-lg-3 col-form-label">
            Usuário:
          </label>
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              {...bindUsername}
            />
          </div>
        </div>
        <div className="mb-2 mb-lg-3 row">
          <label htmlFor="inputPassword" className="col-lg-3 col-form-label">
            Senha:
          </label>
          <div className="col-lg-9">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              {...bindPassword}
            />
          </div>
        </div>
        <div className="mb-2 mb-lg-3 text-center">
          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
        </div>
        {/* <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
              <h5>
                To access the example app,
                <br />
                please contact me via email:
                <br />
                <a href="mailto:contato@jonasbm.com.br">
                  contato@jonasbm.com.br
                </a>
              </h5>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
