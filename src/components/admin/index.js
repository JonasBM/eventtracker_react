import React from "react";
import Users from "./Users";
import ModalFormUser from "./ModalFormUser";
import SurveyEventType from "./SurveyEventType";
import ModalFormSurveyType from "./ModalFormSurveyType";
import NoticeEventType from "./NoticeEventType";
import ModalFormNoticeType from "./ModalFormNoticeType";
import NoticeColor from "./NoticeColor";
import ModalFormNoticeColor from "./ModalFormNoticeColor";

export default function () {
  return (
    <div>
      <ModalFormUser />
      <ModalFormSurveyType />
      <ModalFormNoticeType />
      <ModalFormNoticeColor />
      <div className="mx-5">
        <Users />
        <SurveyEventType />
        <NoticeEventType />
        <NoticeColor />
        <a
          href="https://materializecss.com/color.html#palette"
          target="_blank"
          rel="noreferrer noopener"
        >
          Paleta de cores para referência
        </a>
      </div>
    </div>
  );
}
