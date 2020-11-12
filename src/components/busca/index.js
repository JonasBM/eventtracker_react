import React, { useEffect, useState } from "react";
import NoticeBusca from "./NoticeBusca";
import SurveyBusca from "./SurveyBusca";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import "./index.css";

export default function () {
  const [search_address, setSearch_address] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDSurveyEventType.read());
    let searchParams = new URLSearchParams(location.search);
    setSearch_address(searchParams.get("search_address"));
    const params = { search_address: searchParams.get("search_address") };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
  }, [dispatch, location]);

  return (
    <div className="container">
      <h5 className="p-2">
        Resultado da busca pra o endereço: "{search_address}"
      </h5>
      <div className="row row-cols-1 row-cols-md-3 m-2">
        <NoticeBusca />
        <SurveyBusca />
      </div>
    </div>
  );
}
