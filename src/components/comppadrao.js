import React, { Component } from "react";
import { useSelector } from "react-redux";

export const comppadrao = () => {
  // const state = useSelector(state => state);
  // const dispatch = useDispatch()

  //   console.log(state);

  return (
    <div className={classes.root}>
      <Typography>comppadrao</Typography>
      <Button onClick={() => dispatch(console.log(state))}>Button</Button>
    </div>
  );
};

export default comppadrao;
