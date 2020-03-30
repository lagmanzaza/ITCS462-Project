import * as rethinkDB from "rethinkdbdash";

export default rethinkDB({
  port: 28015,
  host: "db",
  db: "election"
  // password: "ElectionSystem"
});
