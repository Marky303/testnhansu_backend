import express from "express";
import cors from "cors";
import exitHook from "async-exit-hook";
import "dotenv/config";

import { router } from "./routers/index.js";
import { corsOptions } from "./config.js";

function runServer() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  app.use(router);

  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running http://localhost:${process.env.PORT}`
    );
  });

  exitHook(async function () {
    // TODO: exit
  });
}

(async function () {
  try {
    runServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
