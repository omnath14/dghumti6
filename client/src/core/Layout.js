import React from "react";


import Menu from "./Menu";
import Footer from "./Footer";
import Search from "./Search";


const Layout = ({children}) => (

    <div>
        <Menu />
<Search/>

        <div>{children}</div>
        <Footer/>
    </div>


);

export default Layout;
