import React from "react";
import { css } from "@emotion/core";

export const Item = ({ children }) => {
    const containerStyle = css`
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        &:hover {
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
        }
    `;

    return <div css={containerStyle}>{children}</div>;
};
