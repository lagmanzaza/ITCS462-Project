import db from "../../../db";
import schema from "./schema";
import verifyRoles from "../../../hooks/verify-roles";

export default {
  url: "/votes",
  method: "GET",
  schema,
  preHandler: verifyRoles(["admin", "user"]),
  handler: async (req: any, res: any) => {
    try {
      const authToken = req.userInfo.authToken;
      const result = await db.table("votes").filter({ authToken }).run();
      const isUserVoted = result.length !== 0;
      if (isUserVoted) {
        res.status(409).send({ message: "User did vote" });
        return;
      }

      res.send({ message: "user can vote" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ message: "Service Unavailable" });
    }
  },
};
