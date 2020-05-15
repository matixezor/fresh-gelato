import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Spinner, Button} from "reactstrap";

import "../css/RecipeInfo.css";

import RecipeInfoTable from "./RecipeInfoTable";
import Recipe from "./Recipe";
import NotFound from "./NotFound";


const RecipeInfo = ({id, seeAlso, handleClick, handleBack}) => {
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [error, setError] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [ingredientCount, setIngredientCount] = useState(0);


    useEffect(() =>{
        const fetchRecipes = async () => {
            setLoading(true);

            try {
                const res = await axios.get('http://127.0.0.1:8000/api/recipes/' + id + '/', {
                    headers: {
                        Authorization: `JWT ${sessionStorage.getItem('token')}`
                    }
                });
                setRecipeIngredients(res.data.ingredients);
                setRecipeName(res.data.name);
                setTotalQuantity(res.data.base_amount);
                res.data.ingredients.map(ingredient => (
                    setTotalCost(cost => cost + ingredient.cost)
                ));
                setIngredientCount(res.data.ingredient_count);
                setTotalPrice(res.data.total_price);
                setLoading(false);
            } catch (e) {
                setError(true);
            }
        };

        fetchRecipes();
    }, [id]);

    useEffect(() => {
        setRecipeIngredients(ingredients => (
            ingredients.map(ingredient =>
                ({
                    ...ingredient,
                    amount: Math.round(totalQuantity * ingredient.percentage),
                    cost: parseFloat((
                        ingredient.price * totalQuantity * ingredient.percentage/1000
                    ).toFixed(2))
                })
            )
        ));
    }, [totalQuantity]);

    useEffect(() => {
        setTotalCost(0);
        recipeIngredients.map(ingredient => (
            setTotalCost(cost => cost + ingredient.cost)
        ));
    }, [recipeIngredients]);

    const handleChange = (e) => setTotalQuantity(e.target.value < 0 ? 0 : e.target.value);

    const uniqid = require('uniqid');


    if(error)
        return <NotFound/>;
    if(loading)
        return <Spinner id="Spinner" color="dark"/>;
    return(
        <main>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}><h1 id='recipe-name'>{recipeName}</h1><Button onClick={handleBack} outline color="secondary">Back</Button></div>
            <hr id='recipe-info-hr'/>
            <div className='recipe-img-table-wrapper' style={{display: 'flex', flexDirection: 'row', paddingLeft: '1rem', marginBottom: "1rem"}}>
                <div>
                    <img src="https://via.placeholder.com/550x350" alt='gelato'/>
                </div>
                <RecipeInfoTable
                    ingredients={recipeIngredients}
                    ingredientCount={ingredientCount}
                    totalPrice={totalPrice}
                    totalCost={totalCost.toFixed(2)}
                    totalQuantity={totalQuantity}
                    handleChange={handleChange}
                />
            </div>
            <h4>See also</h4>
            <div className="recipe-list-content">
                {seeAlso.map(recipe => (
                    <Recipe
                        key={uniqid()}
                        id={recipe.id}
                        name={recipe.name}
                        img={recipe.image}
                        handleClick={handleClick}
                    />))
                }
            </div>
            <div className="recipe-push"></div>
        </main>
    )
};

export default RecipeInfo;