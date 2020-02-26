import React from "react";
import { css } from "@emotion/core";
import { PageHeader } from "./PageHeader";

export const PageActionBar = ({ title, children }) => {
    const pageActionBarStyle = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    `;

    return (
        <div css={pageActionBarStyle}>
            <PageHeader>{title}</PageHeader>
            <div>{children}</div>
        </div>
    )

}