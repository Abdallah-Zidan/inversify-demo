import express from "express";
import containerServer, { routeInfo } from "./bootstrap";

const app = express();
app.use(express.json());
app.get("/hi", (_1, res) => {
  res.send({ hi: "hola" });
});

const server = containerServer(app);

if (!global.__qurba__config)
  global.__qurba__config = {
    appName: "cats",
  };

server.build().listen(3000, () => {
  console.log("server running at 3000");
  console.log("routes registered");
  console.log(__qurba__config);
  console.dir(routeInfo(), { depth: null });
});
