import { json } from "react-router-dom";
import About from "../client/about";
import { App } from "../client/app";
import Main from "../client/main";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
        loader() {
          return json({ message: "Welcome to React Router!" });
        },
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
];
