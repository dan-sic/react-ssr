import { App } from "../client/app.jsx";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { routes } from "./routes.js";

export const render = (req, res) => {
  const stream = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
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
