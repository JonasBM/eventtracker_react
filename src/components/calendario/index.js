import React, { useState, useEffect } from "react";
import moment from "moment";
import Calendario from "./Calendario";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";

import { getDateFromString } from "./utils";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";

export default function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCRUDNotice.read());
    dispatch(actionCRUDNoticeEventType.read());
  }, [dispatch]);

  let thedate = new Date();
  if (window.location.hash !== "") {
    thedate = getDateFromString(window.location.hash.substring(1));
  }
  const [momentdate, setMomentdate] = useState(moment(thedate));
  return <Calendario momentdate={momentdate} onChange={setMomentdate} />;
}
