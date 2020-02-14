import React, {useContext, useEffect} from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getProfileFrom, getWaitingStatusFrom } from "../redux/selectors";
import { getRecipes } from "../redux/actions";

export function Recipes() {
    const dispatch = useDispatch();

    // Selectors
    const profile = useSelector(state => getProfileFrom(state));
    const recipes = useSelector(state => getRecipesFrom(state));
    const waiting = useSelector(state => getWaitingStatusFrom(state));

    useEffect(() => {
        console.log("Recipes component mounted");
        dispatch(getRecipes({ profileId: profile.id }));
        return () => {
            console.log("Recipes component unmounted")
        }
    }, []);

    if (recipes.length) {
        const recipeList = recipes.map(recipe =>
            <li key={recipe.id}>{recipe.name}</li>
        );
        return (
            <React.Fragment>
                <h1>Recipes</h1>
                <ul>{recipeList}</ul>
            </React.Fragment>
        )
    }

    return null;
};