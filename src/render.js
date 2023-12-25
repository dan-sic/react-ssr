import { App } from "../client/app.jsx";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import {
  StaticRouter,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import { routes } from "./routes.js";
import { createFetchRequest } from "./request.js";

const handler = createStaticHandler(routes);

export const render = async (req, res) => {
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);

  let router = createStaticRouter(handler.dataRoutes, context);

  const stream = renderToPipeableStream(
    <StaticRouterProvider router={router} context={context} />,
    {
      bootstrapScripts: ["client.bundle.js"],
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      // onAllReady() {
      //   res.statusCode = 200;
      //   res.setHeader("Content-type", "text/html");
      //   stream.pipe(res);
      // },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Loading...</p>");
      },
    }
  );
};
