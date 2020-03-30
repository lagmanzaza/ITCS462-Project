import server from "./app";

const port = Number(process.env.PORT) || 3000;
server()
  .listen(port, "0.0.0.0")
  .then(() => {
    console.log(`listening ${port}`);
  });
