import React from "react";
import { css } from "@emotion/core";

export const Title = ({ children }) => {
    const style = css`
        font-family: "Barlow", sans-serif;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        gap: 10px;
        margin: 0;
    `;

    return <h2 css={style}>{children}</h2>;
};
