export default {
  headers: {
    type: "object",
    properties: {
      authorization: {
        type: "string",
      },
    },
    required: ["authorization"],
  },
  body: {
    type: "object",
    properties: {
      partyId: {
        type: "string",
      },
    },
    required: ["partyId"],
  },
};
