import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
// import { loadUser } from "./actions/auth";
// import AlertTemplate from "react-alert-template-basic";
import { Provider as AlertProvider } from "react-alert";
import { loadUser } from "./actions/actionAuth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/common/NotFound";
import Loading from "./components/common/Loading";

// import "bootstrap/dist/css/bootstrap.css";
// import "./fix-bootstrap5.css";
import "./bootstrap.flatly.min.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Alerts from "./components/layouts/Alerts";
import AlertTemplate from "./components/layouts/AlertTemplate";

// import Calendario from "./components/calendario/Calendario";
import Calendario from "./components/calendario/";
import Perfil from "./components/perfil/Perfil";
import Aconcluir from "./components/aconcluir/Aconcluir";

import Login from "./components/accounts/Login";
import Logout from "./components/accounts/Logout";

import "./App.css";

export const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  // Alert Options
  const alertOptions = {
    timeout: 3000,
    position: "bottom center",
  };

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Alerts />
          <Header />
          <main role="main">
            <Switch>
              <PrivateRoute exact path="/" component={Calendario} />
              <PrivateRoute exact path="/perfil" component={Perfil} />
              <PrivateRoute exact path="/aconcluir" component={Aconcluir} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/loading" component={Loading} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
