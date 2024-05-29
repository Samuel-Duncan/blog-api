import { Outlet } from "react-router-dom";
import Header from "./components/root/Header";
import Menu from "./components/root/Menu";

const Root = () => {
  return (
    <>
      <Header />
      <Menu />
      <Outlet />
    </>
  );
};

export default Root;
