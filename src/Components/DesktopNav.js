import React from 'react';
import {Link} from "react-router-dom";

import "../css/DesktopNav.css";
import UserContext from "../Context/UserContext";


const DesktopNav = ({handleLogout}) => {

    return(
        <UserContext.Consumer>
            {user => (
                <nav>
                <ul className="nav_links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/recipes">Recipes</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        {user.loggedIn
                            ? <Link to="/" onClick={handleLogout}>Logout</Link>
                            : <Link to="/login">Login</Link>
                        }
                    </li>
                </ul>
            </nav>
            )}
        </UserContext.Consumer>
    );
};
export default DesktopNav;