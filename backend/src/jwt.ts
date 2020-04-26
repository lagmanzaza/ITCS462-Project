import * as jwt from "jsonwebtoken";

const secret = "secret";
export default {
  sign: (payload: Record<string, any>, expireDate?: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const expiresIn = expireDate || "7d";
      jwt.sign(
        { payload },
        secret,
        {
          expiresIn,
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    }),
  verify: (authorization: string) => {
    try {
      if (authorization) {
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, secret);
        const userInfo: any = jwt.decode(token);
        return { isValid: true, ...userInfo };
      }
    } catch (e) {
      return { isValid: false };
    }
  },
  decode: (token: string): any => jwt.decode(token),
};
