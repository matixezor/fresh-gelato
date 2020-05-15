import React from 'react';
import {isMobile} from "react-device-detect";

import "../css/Main.css";
import text from "../text/AboutUs"


const Main = ({mainImg, iceCreamIcon, largeImg, mediumImg}) => {
    const icon = <img src={iceCreamIcon} alt="ice cream icon" />;


    return(
        <main id="main">
            <section id="first">
                <span className="centeredText">
                    <p>TRADITIONAL</p>
                    <p>ITALIAN GELATO</p>
                </span>
                <img src={mainImg} alt="ice cream"/>
            </section>
            <section id="second">
                <div className="responsiveImg">
                    {isMobile
                        ? <img src={require("../img/ice cream mobile.jpg")} alt="ice cream"/> /*Pictures made by Nadin Dunnigan from Pixabay*/
                        : <img src={largeImg} srcSet={`${largeImg} 1920w, ${mediumImg} 1440w`}  alt="ice cream"/>
                    }
                </div>
                <div id="textSection">
                    <h2>OUR PRODUCTS</h2>
                    <h4>
                        <div>
                            {icon} Fresh and tasty! {icon}
                        </div>
                    </h4>
                    <p>
                        {text}
                    </p>
                </div>
            </section>
            <div className="push"></div>
        </main>
    )
};

export default Main;