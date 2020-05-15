import React from 'react';

import "../css/Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return(
        <footer>
            &copy; Copyright {currentYear}, Gelato
            <p>
                Icons made by
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a>
                from <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com</a><br/>
                <a href="https://icons8.com">Adress, Mail and Telephone icons by Icons8</a>
            </p>
        </footer>
    )
};

export default Footer;