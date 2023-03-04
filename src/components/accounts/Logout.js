import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/actionAuth";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <Redirect to="/login" />;
};

export default Logout;
