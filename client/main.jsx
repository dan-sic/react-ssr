import { useLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Main = () => {
  const data = useLoaderData();
  return (
    <>
      <h1>Main - {data.message}</h1>
      <NavLink to="/about">About</NavLink>
    </>
  );
};

export default Main;
