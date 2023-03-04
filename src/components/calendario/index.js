import React, { useEffect } from "react";
import moment from "moment";
import Calendario from "./Calendario";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDateFromString } from "./utils";
import { newDate } from "../../actions/actionDate";
import { useSelector } from "react-redux";
import ModalFormEvent from "./ModalFormEvent";
import TaskBar from "../common/TaskBar";
import ModalNoticeNotification from "./ModalFormEvent/ModalNoticeNotification";

export default function CalendarioMain() {
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
      <div>
        <div className="container-fluid">
          <div className="row no-gutters px-3">
            <ModalFormEvent />
            <ModalNoticeNotification />
            <div className="col col-12">
              <TaskBar momentdate={momentdate} dateType="month" />
              <Calendario momentdate={momentdate} user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
