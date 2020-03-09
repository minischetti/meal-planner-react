import React from "react";
import { css } from "@emotion/core";

export const FormSectionActionBar = ({ children }) => {
    const formSectionActionBarStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 20px;
        align-items: center;
        grid-template-columns: 4fr auto 1fr;
    `;

    return (
        <div css={formSectionActionBarStyle}>
            {children}
        </div>
    )
}