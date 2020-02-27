import React from "react";
import { css } from "@emotion/core";

export const FormSectionHeader = ({ children }) => {
    const formSectionHeaderStyle = css`
        display: grid;
        gap: 20px;
    `;

    return (
        <div css={formSectionHeaderStyle}>
            {children}
        </div>
    )
}