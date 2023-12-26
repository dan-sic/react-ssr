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
  // with this setup, react-router handles data fetching with loaders
  // the same data that is loaded on the server and used in components
  // will be loaded on the client using window.__staticRouterHydrationData
  let fetchRequest = createFetchRequest(req);
  let context = await handler.query(fetchRequest);
  let router = createStaticRouter(handler.dataRoutes, context);

  const stream = renderToPipeableStream(
    <StaticRouterProvider router={router} context={context} />,
    {
      bootstrapScripts: ["client.bundle.js"],
      // shell is everything up to the first Suspense
      // everything inside Suspense is streamed
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      // if you want to wait for everything to be ready before streaming
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
