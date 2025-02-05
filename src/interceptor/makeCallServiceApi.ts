import axios from "axios";

const makeCallServiceApi = axios.create({
  baseURL: "http://192.200.12.174:9892/",
  timeout: 10000,
});

export default makeCallServiceApi;
