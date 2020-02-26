import React from "react";
import { css } from "@emotion/core";

export const FormSection = ({ title, children }) => {
    const containerStyle = css`
        &:not(:first-of-type) {
            margin-top: 20px;
        }
    `;

    const headerStyle = css`
        font-family: "Barlow", sans-serif;
        margin: 0;
    `;

    const contentStyle = css`
        margin-top: 10px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;

    `;


    return (
        <div css={containerStyle}>
            <h2 css={headerStyle}>{title}</h2>
            <div css={contentStyle}>
                {children}
            </div>
        </div>
    )
}