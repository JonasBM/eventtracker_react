import React, { useEffect } from "react";
import Users from "./Users";
import ModalFormUser from "./ModalFormUser";
import ReportEventType from "./ReportEventType";
import ModalFormReportType from "./ModalFormReportType";
import SurveyEventType from "./SurveyEventType";
import ModalFormSurveyType from "./ModalFormSurveyType";
import NoticeEventType from "./NoticeEventType";
import ModalFormNoticeType from "./ModalFormNoticeType";
import NoticeEventTypeFile from "./NoticeEventTypeFile";
import ModalFormNoticeTypeFile from "./ModalFormNoticeTypeFile";
import NoticeColor from "./NoticeColor";
import ModalFormNoticeColor from "./ModalFormNoticeColor";
import FormDocument from "./FormDocument";
import FormUpdateImovel from "./FormUpdateImovel";
import { useDispatch } from "react-redux";
import { updateImovelLog } from "../../actions/imovel/actionImovel";
import "./index.css";

const AccordionItem = ({ name, title, accordionId, children }) => {
  return (
    <div className="card">
      <div
        className="card-header collapsed"
        id={"header" + name}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={"#collapse" + name}
        aria-expanded="true"
        aria-controls={"collapse" + name}
      >
        <h5 className="mb-0">{title}</h5>
      </div>

      <div
        id={"collapse" + name}
        className="collapse"
        aria-labelledby={name}
        data-bs-parent={"#header" + name}
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default function Admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateImovelLog());
    let intervalId = setInterval(() => {
      dispatch(updateImovelLog());
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <div>
      <ModalFormUser />
      <ModalFormReportType />
      <ModalFormSurveyType />
      <ModalFormNoticeType />
      <ModalFormNoticeColor />
      <ModalFormNoticeTypeFile />
      <div className="mx-5 mt-2">
        <a
          href="https://materializecss.com/color.html#palette"
          target="_blank"
          rel="noreferrer noopener"
        >
          Paleta de cores para referência
        </a>
        <div className="accordion mt-2" id="accordionAdmin">
          <AccordionItem
            name="user"
            title="Lista de usuários"
            accordionId="accordionAdmin"
          >
            <Users />
          </AccordionItem>
          <AccordionItem
            name="report"
            title="Lista de Tipos de Relatórios"
            accordionId="accordionAdmin"
          >
            <ReportEventType />
          </AccordionItem>
          <AccordionItem
            name="survey"
            title="Lista de Tipos de Vistorias"
            accordionId="accordionAdmin"
          >
            <SurveyEventType />
          </AccordionItem>
          <AccordionItem
            name="notice"
            title="Lista de Tipos de Autos e relacionados"
            accordionId="accordionAdmin"
          >
            <NoticeEventType />
          </AccordionItem>
          <AccordionItem
            name="noticecolor"
            title="Lista de Cores para data de início dos Autos e relacionados"
            accordionId="accordionAdmin"
          >
            <NoticeColor />
          </AccordionItem>
          <AccordionItem
            name="noticefile"
            title="Lista de Notificações dos Autos"
            accordionId="accordionAdmin"
          >
            <NoticeEventTypeFile />
          </AccordionItem>
          <AccordionItem
            name="documentos_va_rf"
            title="Upload de documentos padrões (VA e RF)"
            accordionId="accordionAdmin"
          >
            <FormDocument />
          </AccordionItem>
          <AccordionItem
            name="update_imoveis"
            title="Atualizar imóveis"
            accordionId="accordionAdmin"
          >
            <FormUpdateImovel />
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
