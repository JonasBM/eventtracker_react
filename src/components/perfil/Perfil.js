import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Perfil = () => {
  const notices = useSelector((state) => state.notice.notices);

  useEffect(() => {
    for (let i in notices) {
      console.log(i);
    }
  }, [notices]);

  return <h1 className="container-fluid border-darken-1">Perfil</h1>;
};

export default Perfil;
