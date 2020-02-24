import React from "react";
import { css } from "@emotion/core";

export const ListRow = ({ children }) => {
    const listRowStyle = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr 1fr;
        gap: 20px;
        align-items: center;
        padding: 20px;
        // background-color: #e8e8e8;
        &:not(:last-child) {
            border-bottom: 1px solid #e8e8e8;
        }
    `;

    return (
        <div css={listRowStyle}>{children}</div>
    )
}