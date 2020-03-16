import React from "react";
import { css } from "@emotion/core";

export const Header = ({ title }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        margin: 0;
    `;

    return <h2 css={titleStyle}>{title}</h2>;
};
