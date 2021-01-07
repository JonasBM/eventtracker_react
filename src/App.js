import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./loadInterceptor";
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
import Tarefas from "./components/tarefas/";
import Perfil from "./components/perfil/Perfil";
import Aconcluir from "./components/aconcluir/";
import Incompativel from "./components/incompativel/";
import Busca from "./components/busca/";
import Admin from "./components/admin/";

import Login from "./components/accounts/Login";
import Logout from "./components/accounts/Logout";

import { actionCRUDUserProfile } from "./actions/user/actionUserProfile";

import "./App.css";
import AdminRoute from "./components/common/AdminRoute";

export const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(actionCRUDUserProfile.read());
  }, []);

  // Alert Options
  const alertOptions = {
    timeout: 3000,
    position: "bottom center",
    containerStyle: {
      zIndex: 1070,
    },
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
              <PrivateRoute exact path="/calendario" component={Calendario} />
              <PrivateRoute exact path="/tarefas" component={Tarefas} />
              <PrivateRoute exact path="/aconcluir" component={Aconcluir} />
              <AdminRoute exact path="/admin" component={Admin} />
              <PrivateRoute exact path="/busca" component={Busca} />
              <PrivateRoute
                exact
                path="/incompativel"
                component={Incompativel}
              />
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
