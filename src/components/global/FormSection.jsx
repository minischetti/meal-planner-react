import React from "react";
import { css } from "@emotion/core";

export const FormSection = ({ children }) => {
    const formSectionStyle = css`
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;

        &:not(:first-of-type) {
            margin-top: 20px;
        }
    `;

    return (
        <div css={formSectionStyle}>
            {children}
        </div>
    )
}