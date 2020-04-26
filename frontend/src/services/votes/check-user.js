import axios from "../";

export default () => {
  return axios.get("/votes", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
