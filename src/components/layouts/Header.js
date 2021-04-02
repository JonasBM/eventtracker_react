import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
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
            <NavItem to="/busca">Buscar</NavItem>
            <NavItem to="/incompativel">Verificação de imóvel</NavItem>
            {auth && auth.user && auth.user.is_staff && (
              <NavItem to="/admin">Administração</NavItem>
            )}

            <li className="nav-item ml-lg-5">
              <a
                className="nav-link"
                href="https://github.com/JonasBM/eventtracker_react/wiki"
                target="_blank"
                rel="noreferrer noopener"
                type="button"
                title="Ajuda"
              >
                Ajuda
              </a>
            </li>
          </ul>
          {authButton}
        </div>
      </div>
    </nav>
  );
};

export default Header;
