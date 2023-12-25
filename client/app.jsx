import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./about.jsx";
import { Html } from "./html";
import { Sidebar } from "./sidebar";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <Html>
      <Sidebar />
      <Suspense fallback="Loading...">
        <Outlet />
      </Suspense>
    </Html>
  );
};
