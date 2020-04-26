import schema from "./schema";
import db from "../../../db";
import codePattern from "../../../utils/generator/code-pattern";
import * as argon from "argon2";

export default {
  url: "/users",
  method: "POST",
  schema,
  handler: async (req: any, res: any) => {
    try {
      const userInfo = await db
        .table("users")
        .filter({ username: req.body.username })
        .run();
      const isFoundedUser = userInfo.length !== 0;
      if (isFoundedUser) {
        res.status(409).send({ message: "username is duplicated" });
        return;
      }
      const { username, password, role } = req.body;

      const hashPassword = await argon.hash(password);
      const result = await db.table("users").insert({
        authToken: codePattern("user_xxxxxxxxxxxxxx"),
        role,
        username,
        password: hashPassword,
      });

      res
        .status(201)
        .send({ message: "created", key: result.generated_keys[0] });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Service Unavailable" });
    }
  },
};
