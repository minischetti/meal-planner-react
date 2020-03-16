import React from "react";
import { css } from "@emotion/core";

export const Body = ({ children }) => {
    const style = css`
        display: grid;
        gap: 20px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    `;

    return <div css={style}>{children}</div>;
};
