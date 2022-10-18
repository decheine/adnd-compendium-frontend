import React from "react";
import { useLocation } from "react-router";
import BreadCrumb from "./BreadCrumb/BreadCrumbFrame";
import Footer from "./Footer";

import './Layout.css'

const Layout = ({ children } :any) => {
    const { pathname } = useLocation();
    const breadCrumbs = pathname.split("/");
    console.log("pathname: " + pathname, breadCrumbs)
    // console.log("Breadcrumb:", breadCrumbs)
    return (
      <div className="layout-wrapper">
      <div className="layout">
        {pathname !== "/" ? <BreadCrumb title={breadCrumbs[1]} setting={breadCrumbs[2]} book={breadCrumbs[3]} monster_key={breadCrumbs[4]}/> : null}
        <div className="layout-main">{children}</div>
      </div>
      <Footer/>
      </div>
    );
};



  

  export default Layout