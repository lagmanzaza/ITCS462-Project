import schema from "./schema";
import verifyRoles from "../../../hooks/verify-roles";
import db from "../../../db";

export default {
  url: "/parties",
  method: "GET",
  schema,
  preHandler: verifyRoles(["admin", "user"]),
  handler: async (req: any, res: any) => {
    try {
      const result = await db.table("parties");
      res.send(result);
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ message: "Service Unavailable" });
    }
  },
};
