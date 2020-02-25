import React from "react";
import { NewRecipeListItem, RecipeListItem } from "./components";
import { css } from "@emotion/core";

export function RecipeList({ recipes }) {
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
        <div css={recipeListStyle}>
            {recipeList}
        </div>
    )
};