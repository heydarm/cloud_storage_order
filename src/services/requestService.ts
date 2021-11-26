import Axios from "axios";

const axios = Axios.create();

export const apiGetPlans = () =>
  axios({
    method: "GET",
    url: "https://run.mocky.io/v3/7bd73285-e105-457c-a0e7-265fc96da154",
  });

export const apiConfirmOrder = () =>
  axios({
    method: "POST",
    url: "https://httpbin.org/post",
  });
