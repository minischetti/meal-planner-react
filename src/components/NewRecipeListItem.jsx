import React from "react";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

export const NewRecipeListItem = () => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: #c9ecc3;
        border-radius: 8px;
    `;

    const iconStyle = css`
        color: black;
    `;

    return (
        <Link to={{ pathname: "/recipe/new" }}>
            <div css={containerStyle}>
                <div>New Recipe</div>
                <ion-icon name="add-outline" css={iconStyle}></ion-icon>
            </div>
        </Link>
    )
}