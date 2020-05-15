import React from 'react';
import {Input} from 'reactstrap';

import "../css/RecipesList.css";

import Recipe from "./Recipe";
import PaginationComponent from "./PaginationComponent";

const RecipesList = ({currRecipes, recipesPerPage, totalRecipes, paginate, currPage, handleChange, handleClick}) => {

    const uniqid = require('uniqid');

    return(
        <main className="recipe-list-wrapper">
            <Input placeholder="Search.." onChange={handleChange}/>
            <h1>Recipes</h1>
            <hr/>
            <div className="recipe-list-content">
                {currRecipes.map(recipe => (
                    <Recipe
                        key={uniqid()}
                        id={recipe.id}
                        name={recipe.name}
                        img={recipe.image}
                        handleClick={handleClick}
                    />))
                }
            </div>
            {currRecipes.length !== 0
            &&
            <PaginationComponent
                recipesPerPage={recipesPerPage}
                totalRecipes={totalRecipes}
                paginate={paginate}
                currPage={currPage}
            />
            }
            <div className="push"></div>
        </main>
    )
};

export default RecipesList;