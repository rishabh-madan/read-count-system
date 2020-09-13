import axios from "axios";

let baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

class ApiRequests {
  static get = async (url) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    let res = await axios.get(`${baseUrl}${url}`);
    return res.data;
  };

  static post = async (url, body) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    let res = await axios.post(`${baseUrl}${url}`, body);
    return res.data;
  };
}

export default ApiRequests;
