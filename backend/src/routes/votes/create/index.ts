import schema from "./schema";
import verifyRoles from "../../../hooks/verify-roles";
import db from "../../../db";

export default {
  url: "/votes",
  method: "POST",
  schema,
  preHandler: verifyRoles(["user", "admin"]),
  handler: async (req: any, res: any) => {
    try {
      const { partyId } = req.body;
      const authToken = req.userInfo.authToken;
      const checkUser = await db.table("votes").filter({ authToken }).run();

      const isUserVoted = checkUser.length !== 0;
      if (isUserVoted) {
        res.status(409).send({ message: "User did vote" });
        return;
      }

      const partyInfo = await db.table("parties").filter({ id: partyId }).run();
      const isPartyNotFound = partyInfo.length === 0;
      if (isPartyNotFound) {
        res.status(404).send({ message: "party not found" });
        return;
      }

      await db.table("votes").insert({
        authToken,
        partyId,
        updateAt: new Date(),
        createAt: new Date(),
      });

      await db
        .table("parties")
        .filter({ id: partyId })
        .update({
          score: db.row("score").add(1),
        });

      res.status(201).send({ message: "voted" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ message: "Service Unavailable" });
    }
  },
};
