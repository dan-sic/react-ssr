import { Suspense, lazy } from "react";
import { Html } from "./html";
import { Sidebar } from "./sidebar";

const Main = lazy(
  () => new Promise((res) => setTimeout(() => res(import("./main.jsx")), 3000))
);

export const App = () => {
  return (
    <Html>
      <Sidebar />
      <Suspense fallback="Loading...">
        <Main />
      </Suspense>
    </Html>
  );
};
