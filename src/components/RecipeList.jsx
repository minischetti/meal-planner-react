import React, { useEffect } from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getProfileFrom, getRecipeWaitingStatusFrom } from "../redux/selectors";
import { getRecipes } from "../redux/actions";
import { RecipeListItem } from "./RecipeListItem";
import { css } from "@emotion/core";

export function RecipeList({recipes}) {
    const recipeListStyle = css`
        display: grid;
        gap: 10px;
    `;

    if (!recipes || !recipes.length) {
        return (
            <div>No recipes.</div>
        )
    }

    const recipeList = recipes.map(recipe =>
        <RecipeListItem
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
};