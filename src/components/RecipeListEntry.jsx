import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

export const RecipeListEntry = ({ name, id }) => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border: 1px solid black;
        border-radius: 8px;
    `;
    const iconStyle = css`
        color: black;
    `;

    return (
        <Link to={{ pathname: `/recipes/${id}` }}>
            <div css={containerStyle}>
                <div>{name}</div>
                <ion-icon name="arrow-forward-outline" css={iconStyle}></ion-icon>
            </div>
        </Link>
    );
}