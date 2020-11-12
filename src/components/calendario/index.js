import React, { useEffect } from "react";
import moment from "moment";
import Calendario from "./Calendario";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDateFromString } from "./utils";
import { newDate } from "../../actions/actionDate";
import { useSelector } from "react-redux";
import ModalEvent from "./ModalFormEvent/ModalEvent";
import { AconcluirPanel } from "../aconcluir";

export default function () {
  const momentdate = useSelector((state) => state.date);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    let thedate = moment();
    if (location.hash !== "") {
      thedate = moment(getDateFromString(location.hash.substring(1)));
    }
    dispatch(newDate(thedate));
  }, [dispatch, location.hash]);
  if (momentdate) {
    return (
      <div className="row no-gutters px-3">
        <ModalEvent />
        <div className="col col-xl-10 pr-xl-0">
          <Calendario momentdate={momentdate} />
        </div>
        <div className="col-xl-2 d-none d-xl-block pl-0">
          <AconcluirPanel />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
