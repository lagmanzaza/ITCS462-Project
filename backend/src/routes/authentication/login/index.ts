import schema from "./schema";
import db from "../../../db";
import redis from "../../../redis";
import * as argon from "argon2";
import jwt from "../../../jwt";

const ONE_HOUR = 3600;
export default {
  url: "/login",
  method: "POST",
  schema,
  handler: async (req: any, res: any) => {
    try {
      const { username, password } = req.body;
      const userInfo = await db.table("users").filter({ username }).run();
      const isFoundedUser = userInfo.length !== 0;
      if (!isFoundedUser) {
        res.status(404).send({ message: "username not found" });
        return;
      }

      const isPasswordCorrect = argon.verify(userInfo[0].password, password);
      if (!isPasswordCorrect) {
        res.status(403).send({ message: "password is incorrect" });
        return;
      }

      const token = await jwt.sign(
        { authToken: userInfo[0].authToken, role: userInfo[0].role },
        "3h"
      );
      await redis.set(userInfo[0].authToken, userInfo[0].role, "ex", ONE_HOUR);
      res.status(200).send({ message: "loged", token });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ message: "Service Unavailable" });
    }
  },
};
