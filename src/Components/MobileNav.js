import React, {useState} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import "../css/MobileNav.css";
import logo from "../img/logo2.png";
import {Link} from "react-router-dom";
import UserContext from "../Context/UserContext";


const MobileNav = ({handleLogout}) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return(
        <UserContext.Consumer>
            {user => (
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto"><img src={logo} alt="logo"/></NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/recipes">Recipes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact">Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                {user.loggedIn
                                    ? <Link to="/" onClick={handleLogout}>Logout</Link>
                                    : <Link to="/login">Login</Link>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            )}
        </UserContext.Consumer>
    )
};

export default MobileNav;