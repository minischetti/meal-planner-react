import React from "react";
import { css } from "@emotion/core";

export const FormSection = ({ children }) => {
    const formSectionStyle = css`
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