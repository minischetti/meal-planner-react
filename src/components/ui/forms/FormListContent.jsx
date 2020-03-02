import React from "react";
import { css } from "@emotion/core";

export const FormListContent = ({ children }) => {
    const formListContentStyle = css`
        display: grid;
    `;

    return (
        <div css={formListContentStyle}>
            {children}
        </div>
    )
}