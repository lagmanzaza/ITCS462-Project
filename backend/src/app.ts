import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import * as helmet from "fastify-helmet";
import * as compress from "fastify-compress";
import * as cors from "fastify-cors";
import * as socketio from "socket.io";
import routes from "./routes";

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify();

// server.get("/ping", async (request, reply) => {
//   try {
//     // await db.dbCreate("election");
//     await db.tableCreate("users");
//     await db.tableCreate("parties");
//     await db.tableCreate("votes");
//     reply.code(200).send("result");
//   } catch (e) {
//     console.log(e);
//     reply.code(200).send("aaa");
//   }
//   // const result = await db.table("users").insert({
//   //   username: "aaaa",
//   //   password: "bbbb"
//   // });
// });

const io = socketio(server.server, {
  transports: ["websocket"],
});

export default () => {
  io.on("connection", function (socket) {
    socket.on("message", (message) => {
      socket.broadcast.emit("message", message);
    });
    socket.on("disconnect", function () {});
  });

  server.register(helmet, { hidePoweredBy: { setTo: "PHP 4.2.0" } });
  server.register(compress, { global: false });
  server.register(cors);
  server.register(routes, { prefix: "/v1" });

  return server;
};
