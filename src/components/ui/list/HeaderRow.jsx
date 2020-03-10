import React from "react";
import { css } from "@emotion/core";

export const HeaderRow = ({ children }) => {
    const style = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr 1fr;
        gap: 20px;
        align-items: center;
        padding: 0 0 10px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #ddd;
    `;

    return <div css={style}>{children}</div>;
};
