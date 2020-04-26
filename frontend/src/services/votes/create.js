import axios from "../";

export default (partyId) => {
  return axios.post(
    "/votes",
    { partyId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
