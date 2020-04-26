export default {
  body: {
    additionalProperties: false,
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["username", "password"],
  },
};
