import createUser from "./users/create";
import login from "./authentication/login";
import userVote from "./votes/create";
import createParty from "./parties/create";
import getParty from "./parties/get-query";
import getVote from "./votes/check-user";

const listRoute = [createUser, login, userVote, createParty, getParty, getVote];
export default (fp: any, opts: any, next: Function) => {
  listRoute.forEach((route: any) => {
    fp.route(route);
  });

  next();
};
