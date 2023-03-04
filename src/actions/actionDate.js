import { DATE_NEW } from "./actionTypes";

export const newDate = (momentDate) => {
  window.history.pushState(null, null, "#" + momentDate.format("YYYY-MM-DD"));
  return {
    type: DATE_NEW,
    payload: momentDate,
  };
};
