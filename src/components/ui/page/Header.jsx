import React from "react";
import { css } from "@emotion/core";

export const Header = ({ title, children }) => {
    const headerStyle = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    `;

    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        margin: 0;
    `;

    return (
        <div css={headerStyle}>
            <h1 css={titleStyle}>{title}</h1>
            <div>{children}</div>
        </div>
    );
};
