import React from "react";
import { css } from "@emotion/core";

export const UserPanel = ({ image, name }) => {
    const containerStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        align-items: center;
        & ion-icon {
            width: 40px;
            height: 40px;
        }
    `;

    const nameStyle = css`
        font-weight: bold;
    `;

    return (
        <div css={containerStyle}>
            <ion-icon name="person-circle" />
            <span css={nameStyle}>{name}</span>
        </div>
    );
};
