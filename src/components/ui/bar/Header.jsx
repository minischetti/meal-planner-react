import React from "react";
import { css } from "@emotion/core";

export const Header = ({ children, title }) => {
    const headerStyle = css`
        display: grid;
        gap: 10px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    `;

    const titleStyle = css`
        font-weight: bold;
    `;

    const contentStyle = css`
        display: grid;
        gap: 10px;
    `;

    return (
        <div css={headerStyle}>
            <div css={titleStyle}>{title}</div>
            <div css={contentStyle}>{children}</div>
        </div>
    );
};
