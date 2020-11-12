import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Form, Field } from "react-final-form";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  let authButton;
  if (auth.isAuthenticated) {
    authButton = (
      <NavLink
        to="/login"
        activeClassName="d-none"
        className="btn btn-outline-primary"
      >
        Sair
      </NavLink>
    );
  } else {
    authButton = (
      <NavLink
        to="/login"
        activeClassName="d-none"
        className="btn btn-outline-primary"
      >
        entrar
      </NavLink>
    );
  }

  const onSubmit = (values) => {
    history.push(
      "/busca/?search_address=" + encodeURIComponent(values.search_address)
    );
    values.search_address = "";
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg p-2">
      <div className="container-fluid">
        <span className="navbar-brand">Event Tracker</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                aria-current="page"
                to="/perfil"
              >
                Perfil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                aria-current="page"
                to="/"
              >
                Calendario
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                aria-current="page"
                to="/calendario"
              >
                Tarefas do Dia
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                aria-current="page"
                to="/aconcluir"
              >
                A Concluir
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                aria-current="page"
                to="/admin"
              >
                Administração
              </NavLink>
            </li>
          </ul>
          <Form
            initialValues={""}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="d-flex my-2 my-lg-0 mr-lg-5"
              >
                <Field
                  component="input"
                  type="search"
                  className="form-control mr-2"
                  name="search_address"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            )}
          />
          {authButton}
        </div>
      </div>
    </nav>
  );
};

export default Header;
