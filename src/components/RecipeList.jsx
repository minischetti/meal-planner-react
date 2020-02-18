import React, { useEffect } from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getProfileFrom, getRecipeWaitingStatusFrom } from "../redux/selectors";
import { getRecipes } from "../redux/actions";
import { RecipeListEntry } from "./RecipeListEntry";
import { css } from "@emotion/core";

export function RecipeList() {
    const recipeListStyle = css`
        display: grid;
        gap: 10px;
    `;
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
            <RecipeListEntry
                key={recipe.id}
                name={recipe.name}
                id={recipe.id}
            />
        );
        return (
            <React.Fragment>
                <div css={recipeListStyle}>{recipeList}</div>
            </React.Fragment>
        )
    }

    return null;
};