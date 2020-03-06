import React from "react";
import { css } from "@emotion/core";

export const BarPanel = ({ children, title, count }) => {
    const containerStyle = css`
        display: grid;
        gap: 10px;
        padding: 10px;
        background-color: #ddd;
        border-radius: 8px;
    `;

    const countStyle = css`
        font-weight: bold;
        font-size: 24px;
    `;
    const titleStyle = css`
        font-weight: bold;
    `;

    const contentStyle = css`
        display: grid;
        gap: 10px;
    `;

    return (
        <div css={containerStyle}>
            <div>
                <div css={countStyle}>{count}</div>
                <div css={titleStyle}>{title}</div>
            </div>
            <div css={contentStyle}>{children}</div>
        </div>
    );
};
