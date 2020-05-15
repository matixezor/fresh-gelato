import React from "react";
import {Link, withRouter} from "react-router-dom";
import {isMobile} from "react-device-detect";

import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import "../css/Header.css";
import logo from "../img/logo.png";

const Header = ({location, handleLogout}) => {
    if(location.pathname === "/login")
        return (
            <header style={{justifyContent: "center"}}>
                <img src={logo} alt="logo" />
            </header>
        );

    const mobileHeader = (
        <header className="mobileHeader">
            <MobileNav handleLogout={handleLogout}/>
        </header>
    );

    const desktopHeader = (
        <header className="desktopHeader">
            <Link to="/"><img src={logo} alt="logo"/></Link>
            <DesktopNav handleLogout={handleLogout}/>
        </header>
    );

    return(
            isMobile
                ? mobileHeader
                : desktopHeader
    )
};

export default withRouter(Header);
