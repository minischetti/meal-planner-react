import React from "react";
import { css } from "@emotion/core";

export const BarHeader = ({ children, title }) => {
    const barHeaderStyle = css`
        display: grid;
        gap: 10px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    `;

    const barHeaderTitleStyle = css`
        font-weight: bold;
    `;

    const barHeaderContentStyle = css`
        display: grid;
        gap: 10px;
    `;

    return (
        <div css={barHeaderStyle}>
            <div css={barHeaderTitleStyle}>{title}</div>
            <div css={barHeaderContentStyle}>{children}</div>
        </div>
    );
};
