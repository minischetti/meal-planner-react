import React from "react";
import { css } from "@emotion/core";
import { PageHeader } from "./PageHeader";

export const PageActionBar = ({ title, children }) => {
    const pageActionBarStyle = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
    `;

    return (
        <div css={pageActionBarStyle}>
            <PageHeader>{title}</PageHeader>
            <div>{children}</div>
        </div>
    )

}