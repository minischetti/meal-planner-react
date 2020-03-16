import React from "react";
import { css } from "@emotion/core";

export const Footer = ({ children }) => {
    const style = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        justify-content: end;
    `;
    return <div css={style}>{children}</div>;
};
