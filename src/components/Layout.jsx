import Footer from "./Footer";
import Header from "./Header";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="body">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
