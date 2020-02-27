import React from "react";
import { css } from "@emotion/core";

export const FormSection = ({ children }) => {
    const formSectionStyle = css`
        display: grid;
        gap: 20px;

    `;

    return (
        <div css={formSectionStyle}>
            {children}
        </div>
    )
}