import axios from "axios";

const baseURL = process.env.REACT_APP_baseAPIURL;

const instance = axios.create({
  // baseURL: "http://192.168.49.2:31432",
  baseURL,
});
export default instance;
