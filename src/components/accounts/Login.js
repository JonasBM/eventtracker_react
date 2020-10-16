import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/actionAuth";
import { useInput } from "../../hooks/input-hook";
import { useHistory } from "react-router-dom";

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
      // dispatch(logout()); //loose auth if logged in
    } else if (auth.isAuthenticated && isLoging) {
      history.push("/");
    }
  }, [auth, isLoging, history]);

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
      </form>
    </div>
  );
};

export default Login;
