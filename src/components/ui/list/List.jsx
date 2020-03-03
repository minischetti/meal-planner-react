import React from "react";
import { css } from "@emotion/core";

export function List({ children, emptyText = "This list is empty." }) {
    const listStyle = css`
        display: grid;
        gap: 10px;
    `;

    return (
        <div css={listStyle}>
            {children ? children : <div>{emptyText}</div>}
        </div>
    )
};