import React from "react";

const IconButton = ({ href, icon }) => {
  return (
    <div className="col col-auto p-0 d-flex flex-column justify-content-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="btn btn-secondary d-flex justify-content-center align-content-between p-1 mr-1 float-right"
        type="button"
        title="Procurar endereço no GMaps"
      >
        <i className={"fa " + icon}></i>
      </a>
    </div>
  );
};

export default IconButton;
