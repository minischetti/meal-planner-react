import React from "react";
import { css } from "@emotion/core";

export const Section = ({ children, title }) => {
    const barSectionStyle = css`
        display: grid;
        gap: 10px;
        padding: 10px;
    `;

    const barSectionTitleStyle = css`
        font-weight: bold;
    `;

    const barSectionContentStyle = css`
        display: grid;
        gap: 10px;
    `;

    return (
        <div css={barSectionStyle}>
            {title ? <div css={barSectionTitleStyle}>{title}</div> : null}
            <div css={barSectionContentStyle}>{children}</div>
        </div>
    );
};
