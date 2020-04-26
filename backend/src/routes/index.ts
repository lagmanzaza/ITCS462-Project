import createUser from "./users/create";
import login from "./authentication/login";

const listRoute = [createUser, login];
export default (fp: any, opts: any, next: Function) => {
  listRoute.forEach((route: any) => {
    fp.route(route);
  });

  next();
};
