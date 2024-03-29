import React from "react";
import { css } from "@emotion/core";

export const Header = ({ children }) => {
    const style = css`
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 2fr 1fr 1fr;
        border-bottom: 1px solid #ddd;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 20px;
    `;

    return <div css={style}>{children}</div>;
};
