import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Loading from "./Loading";

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isLoading && auth.isAuthenticated != null) {
          if (auth.isAuthenticated) {
            if (auth.user.is_staff) {
              return <Component {...props} />;
            } else {
              return <Redirect to="/NotAutorized" />;
            }
          } else {
            return <Redirect to="/login" />;
          }
        } else {
          return <Loading />;
        }
      }}
    />
  );
};

export default AdminRoute;
