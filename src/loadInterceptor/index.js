import axios from "axios";
import "./index.css";

const noLoading = ["api/imovelupdatelog/", "api/imovel/"];

axios.interceptors.request.use(
  function (config) {
    if (
      !noLoading.includes(config.url.replace(process.env.REACT_APP_API_URL, ""))
    ) {
      document.body.classList.add("loading-indicator");
    }
    // const token = window.localStorage.token;
    // if (token) {
    //   config.headers.Authorization = `token ${token}`;
    // }
    return config;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);
