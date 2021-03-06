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
      role: {
        type: "string",
        enum: ["user", "admin"],
        default: "user",
      },
    },
  },
};
