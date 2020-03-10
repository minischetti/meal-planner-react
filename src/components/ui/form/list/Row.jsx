import React from "react";
import { css } from "@emotion/core";

export const Row = ({ children }) => {
    const style = css`
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr;
        align-items: center;
        padding-top: 10px;
        &:not(:last-child) {
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
    `;

    return <div css={style}>{children}</div>;
};
