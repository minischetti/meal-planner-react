import React from "react";
import { css } from "@emotion/core";

export const Bar = ({ children }) => {
    const barStyle = css`
        display: grid;
        gap: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
    `;

    return <div css={barStyle}>{children}</div>;
};
