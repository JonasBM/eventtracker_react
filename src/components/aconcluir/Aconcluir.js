import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";

const Aconcluir = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCRUDNotice.read());
  }, [dispatch]);

  return <h1 className="container-fluid border-darken-1">Aconcluir</h1>;
};

export default Aconcluir;
