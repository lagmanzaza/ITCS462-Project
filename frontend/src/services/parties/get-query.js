import axios from "../";
export default () => {
  return axios.get("/parties", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
