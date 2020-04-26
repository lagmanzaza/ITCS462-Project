import schema from "./schema";
import verifyRoles from "../../../hooks/verify-roles";
import db from "../../../db";

export default {
  url: "/parties",
  method: "POST",
  schema,
  preHandler: verifyRoles(["admin"]),
  handler: async (req: any, res: any) => {
    try {
      const result = await db
        .table("parties")
        .insert({ ...req.body, score: 0 });
      res.send({ ...req.body, id: result.generated_keys[0] });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ message: "Service Unavailable" });
    }
  },
};
