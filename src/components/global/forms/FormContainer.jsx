import React from "react";
import { css } from "@emotion/core";

export const FormContainer = ({ children, onSubmit }) => {
    const formContainerStyle = css`
        display: grid;
        gap: 40px;
    `;

    return (
        <form css={formContainerStyle} onSubmit={onSubmit}>
            {children}
        </form>
    )
}