import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import store from "../../store";

export default function buildCalendar(date) {
  const calendar = [];
  const startDay = date.clone().startOf("month").startOf("week");
  const endDay = date.clone().endOf("month").endOf("week");
  const _date = startDay.clone().subtract(1, "day");
  while (_date.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => _date.add(1, "day").clone())
    );
  }
  return calendar;
}

export const filterNoticeDate = (stringDate) => {
  return function (notice) {
    if (notice.date === stringDate) {
      return true;
    }
    for (let index = 0; index < notice.notice_events.length; index++) {
      if (notice.notice_events[index].deadline_date === stringDate) {
        return true;
      }
    }
    return false;
  };
};

export const filterNoticeEventDate = (stringDate) => {
  return function (notice) {
    for (let index = 0; index < notice.notice_events.length; index++) {
      if (notice.notice_events[index].deadline_date === stringDate) {
        return true;
      }
    }
    return false;
  };
};

export const getDateFromString = (stringDate) => {
  const thedayString = stringDate
    .toString()
    .match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g);
  const themonthString = stringDate
    .toString()
    .match(/^\d{4}-(0[1-9]|1[012])$/g);
  if (thedayString !== null) {
    let splitString = thedayString[0].split("-");
    return new Date(splitString[0], splitString[1] - 1, splitString[2]);
  } else if (themonthString !== null) {
    let splitString = themonthString[0].split("-");
    return new Date(splitString[0], splitString[1] - 1);
  } else {
    return new Date();
  }
};

export const getFirstDateOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth());
};

export const getLastDateOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getStarDayOfCalendar = (firstDayOfMonth) => {
  let startDate = new Date(firstDayOfMonth.getTime());
  startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  return startDate;
};

export const getEndDayOfCalendar = (lastDayOfMonth) => {
  let endDate = new Date(lastDayOfMonth.getTime());
  if (endDate.getDay() !== 6) {
    endDate.setDate(lastDayOfMonth.getDate() + lastDayOfMonth.getDay());
  }
  return endDate;
};

export const openNoticeModal = (notice) => {
  console.log(notice);
  var myModal = new bootstrap.Modal(document.getElementById("ModalEvent"), {});
  myModal.show();
};

export const getNoticeEventType = (notice_event) => {
  if (notice_event) {
    const notice_event_types = store.getState().notice.notice_event_types
      .notice_event_types;

    let notice_event_type = notice_event_types.filter(
      (notice_event_type) =>
        notice_event_type.id === notice_event.notice_event_type
    );
    return notice_event_type[0];
  }
};
