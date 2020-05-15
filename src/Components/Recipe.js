import React from 'react';
import {Card, CardImg, CardBody} from 'reactstrap';

import "../css/Recipe.css";

const Recipe = ({id, name, img, handleClick}) => {
    return(
        <Card onClick={() => handleClick(id)}>
            <CardImg
                src={
                    img
                        ?  img
                        :  "http://via.placeholder.com/320x180"
                }
                alt="Card image cap"
            />
            <CardBody>
                {name}
            </CardBody>
        </Card>
    )
};

export default Recipe;