import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import {Link} from 'react-router-dom';

import "../css/RecipesList.css";

import RecipeInfo from "./RecipeInfo";
import RecipesList from "./RecipesList";
import NotFound from "./NotFound";
import UserContext from "../Context/UserContext";


const RecipeWrapper = () => {
    const [recipes, setRecipes] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [recipesPerPage] = useState(6);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState(false);
    const [showRecipeDetails, setShowRecipeDetails] = useState(false);
    const [recipeId, setRecipeId] = useState(0)


    useEffect(() =>{
        const fetchRecipes = async () => {
            setLoading(true);
            try{
                const res = await axios.get('http://127.0.0.1:8000/api/recipes/', {
                    headers: {
                        Authorization: `JWT ${sessionStorage.getItem('token')}`
                    }
                });
                setRecipes(res.data);
                setFiltered(res.data);
                setLoading(false);
            } catch (e) {
                if(e.response.status !== 401) {
                    setError(true);
                }
                else
                    setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleChange = e => {
        let currList = [];
        let newList = [];

        if(e.target.value !== ""){
            currList = recipes;

            newList = currList.filter(recipe => {
                const recipeName = recipe.name.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return recipeName.includes(filter);
            })
        } else {
            newList = recipes;
        }
        setFiltered(newList);
    };

    const handleClick = (id) => {
        setRecipeId(id);
        setShowRecipeDetails(true);
    };

    const handleBack = () => setShowRecipeDetails(false);

    const paginate = (pageNumber) => setCurrPage(pageNumber);

    const lastRecipeIndex = currPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currRecipes = filtered.slice(firstRecipeIndex, lastRecipeIndex);

    let body = (
        showRecipeDetails
            ? <RecipeInfo
                id={recipeId}
                seeAlso={[
                    recipes[(recipeId)%recipes.length],
                    recipes[(recipeId+1)%recipes.length],
                    recipes[(recipeId+2)%recipes.length]
                ]}
                handleBack={handleBack}
                handleClick={handleClick}
            />
            : <RecipesList
                currRecipes={currRecipes}
                recipesPerPage={recipesPerPage}
                totalRecipes={filtered.length}
                paginate={paginate}
                currPage={currPage}
                handleChange={handleChange}
                handleClick={handleClick}
            />
    );

    if(error)
        return <NotFound />;
    if(loading)
        return <Spinner id="Spinner" color="dark" />;
    return(
        <UserContext.Consumer>
            {user => (
                user.loggedIn
                    ? body
                    : (
                        <div>
                            <h2>You must <Link to='/login'>login</Link> to see this site!</h2>
                            <h4>If you don't have an account and are interested in our business please use the
                                <Link to='/contact'> contact form!</Link>
                            </h4>
                        </div>
                    )
            )}
        </UserContext.Consumer>
    )
};

export default RecipeWrapper;