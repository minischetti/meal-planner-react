import React from "react";
import { css } from "@emotion/core";

export const ListRow = ({ children }) => {
    const listRowStyle = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr 1fr;
        gap: 20px;
        align-items: center;
        padding-top: 20px;
        &:not(:last-child) {
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
    `;

    return (
        <div css={listRowStyle}>{children}</div>
    )
}