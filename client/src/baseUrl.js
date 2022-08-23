import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.49.2:31432",
});
export default instance;
