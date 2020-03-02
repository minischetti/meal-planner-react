import React from "react";
import { css } from "@emotion/core";

export function RecipeList({ children }) {
    const recipeListStyle = css`
        display: grid;
        gap: 10px;
    `;

    return (
        <div css={recipeListStyle}>
            {children ? children : <div>Recipes will appear in this list.</div>}
        </div>
    )
};