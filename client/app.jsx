import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./about.jsx";
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
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Html>
  );
};
