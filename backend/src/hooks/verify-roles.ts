import jwt from "../jwt";
import redis from "../redis";

const verifyRole = (role: string, roles: string[]): boolean =>
  roles.includes(role);

export default (roles: string[]) => {
  return async (req: any, res: any) => {
    const token = req.headers.authorization;
    req.userInfo = await jwt.verify(token);
    const isTokenValid = req.userInfo.isValid;
    const authToken = req.userInfo.payload.authToken;
    const role = await redis.get(authToken);
    const isRoleValid = verifyRole(role, roles);

    if (isTokenValid && isRoleValid) {
      return;
    }

    if (!isTokenValid) {
      res.status(401).send({ message: "Unauthorization" });
      return;
    }

    if (!isRoleValid) {
      res.status(403).send({ message: "Insufficient Permission" });
      return;
    }
  };
};
