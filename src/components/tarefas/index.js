import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDateFromString } from "../calendario/utils";
import { newDate } from "../../actions/actionDate";
import { useSelector } from "react-redux";
import TaskBar from "../common/TaskBar";
import ModalFormEvent from "../calendario/ModalFormEvent";
import CalendarioTarefa from "./CalendarioTarefa";

export default function Tarefas() {
  const dispatch = useDispatch();
  const momentdate = useSelector((state) => state.date);
  const user = useSelector((state) => state.user.users.current);
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
      <div className="container-fluid">
        <div className="row no-gutters px-3 justify-content-md-center">
          <ModalFormEvent />
          <div className="col col-12 col-md-9 col-lg-6">
            <TaskBar momentdate={momentdate} dateType="date" />
            <CalendarioTarefa momentdate={momentdate} user={user} />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
