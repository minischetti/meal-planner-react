import React from "react";
import { css } from "@emotion/core"

export const PageHeader = ({ children }) => {
    const pageHeaderStyle = css`
        font-family: "Barlow", sans-serif;
        margin: 0;
    `;

    return (
        <h1 css={pageHeaderStyle}>{children}</h1>
    )
}