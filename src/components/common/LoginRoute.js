import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const LoginRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isLoading) {
          if (!auth.isAuthenticated) {
            return <Component {...props} />;
          } else {
          }
        } else {
          return <h2>Loading...</h2>;
        }
      }}
    />
  );
};

export default LoginRoute;
