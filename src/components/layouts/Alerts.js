import React, { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Alerts = (prevProps, props) => {
  const { errors, messages } = useSelector((state) => state);
  const prevErrors = usePrevious(errors);
  const prevMessages = usePrevious(messages);
  const alert = useAlert();
  useEffect(() => {
    if (errors !== prevErrors) {
      if (errors.msg.username)
        alert.error(`Usuário: ${errors.msg.username.join()}`);
      if (errors.msg.password)
        alert.error(`Senha: ${errors.msg.password.join()}`);
      if (errors.msg.non_field_errors) {
        alert.error(errors.msg.non_field_errors.join());
      }
      if (errors.msg.detail) {
        alert.error(errors.msg.detail);
      }
      if (errors.msg.undefined_error) {
        alert.error(errors.msg.undefined_error.join());
      }
    }
    if (messages !== prevMessages) {
      if (messages.deleteLead) alert.success(messages.deleteLead);
      if (messages.addLead) alert.success(messages.addLead);
      if (messages.passwordNotMatch) alert.error(messages.passwordNotMatch);
    }
  }, [errors, prevErrors, messages, prevMessages, alert]);

  return <Fragment />;
};

export default Alerts;
