import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Main = () => {
  return (
    <section className="bg-gray-100">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
