import { App } from "../client/app";
import Main from "../client/main";

export const routes = [
  {
    path: "/",
    element: <App />,
    // loader() {
    //   return json({ message: "Welcome to React Router!" });
    // },
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
];
