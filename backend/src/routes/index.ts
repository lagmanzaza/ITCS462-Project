import createUser from "./users/create";
import login from "./authentication/login";
import userVote from "./votes/create";
import createParty from "./parties/create";
import getParty from "./parties/get-query";

const listRoute = [createUser, login, userVote, createParty, getParty];
export default (fp: any, opts: any, next: Function) => {
  listRoute.forEach((route: any) => {
    fp.route(route);
  });

  next();
};
