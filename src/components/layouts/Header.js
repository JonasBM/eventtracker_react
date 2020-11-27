import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Form, Field } from "react-final-form";
import AutocompleteImovel from "../common/AutocompleteImovel";

const NavItem = ({ to, children }) => {
  return (
    <Route
      exact
      path={to}
      children={({ match }) => (
        <li className={match ? "nav-item active" : "nav-item"}>
          <NavLink
            activeClassName="active"
            className="nav-link"
            aria-current="page"
            to={to}
          >
            {children}
          </NavLink>
        </li>
      )}
    />
  );
};

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
    if (values.imovel) {
      history.push("/busca/?imovel_id=" + encodeURIComponent(values.imovel.id));
    } else {
      history.push("/busca/");
    }
    values.imovel = "";
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg p-2">
      <img
        style={{ height: "35px" }}
        className="d-none d-xl-inline-block mr-2"
        alt=""
        src={process.env.PUBLIC_URL + "/Logo.png"}
      />
      <div className="container-fluid">
        <span className="navbar-brand" href="/" disabled="disabled">
          {auth.user
            ? "AFM " + auth.user.first_name + " " + auth.user.last_name
            : "Event Tracker"}
        </span>
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
            <NavItem to="/perfil">Perfil</NavItem>
            <NavItem to="/">Calendario</NavItem>
            <NavItem to="/tarefas">Tarefas do Dia</NavItem>
            <NavItem to="/aconcluir">A Concluir</NavItem>
            <NavItem to="/admin">Administração</NavItem>
          </ul>
          <Form
            mutators={{
              setValue: ([field, value], state, { changeValue }) => {
                changeValue(state, field, () => value);
              },
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
              <form
                onSubmit={handleSubmit}
                className="d-flex my-2 my-lg-0 mr-lg-5"
              >
                <AutocompleteImovel
                  name="imovel"
                  name_string="imovel.name_string"
                  label=""
                  form={form}
                  showResult={false}
                />
                <button
                  className="btn btn-outline-success btn-sm ml-2"
                  type="submit"
                >
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
