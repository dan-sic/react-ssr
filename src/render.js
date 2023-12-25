import { App } from "../client/app.jsx";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";

export const render = (res) => {
  const stream = renderToPipeableStream(<App />, {
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
  });
};
