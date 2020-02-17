import React, { useContext, useEffect } from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getProfileFrom, getRecipeWaitingStatusFrom } from "../redux/selectors";
import { getRecipes } from "../redux/actions";
import { Recipe } from "./Recipe";

export function RecipeList() {
    const dispatch = useDispatch();

    // Selectors
    const profile = useSelector(state => getProfileFrom(state));
    const recipes = useSelector(state => getRecipesFrom(state));
    const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));

    useEffect(() => {
        console.log("Recipes component mounted");
        dispatch(getRecipes({ profileId: profile.id }));
        return () => {
            console.log("Recipes component unmounted")
        }
    }, []);

    if (waiting) {
        return (
            <div>Loading...</div>
        )
    }

    if (recipes.length) {
        const recipeList = recipes.map(recipe =>
            <Recipe
                key={recipe.id}
                name={recipe.name}
                authors={recipe.authors}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
            />
        );
        return (
            <React.Fragment>
                <ul>{recipeList}</ul>
            </React.Fragment>
        )
    }

    return null;
};