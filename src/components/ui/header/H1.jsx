import React from "react";
import { css } from "@emotion/core";

export const H1 = ({ title }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        margin: 0;
    `;

    return (
        <h1 css={titleStyle}>{title}</h1>
    );
};