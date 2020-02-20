import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

export const RecipeListItem = ({ name, id }) => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: #e8e8e8;
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