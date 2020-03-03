import React from "react";
import { css } from "@emotion/core";
import { GlobalHeader } from "../components/GlobalHeader";

export const AbstractPage = ({ children, disableHeader = false }) => {
    const pageStyle = css`
        font-family: "Lato", sans-serif;
        transition: 0.5s all ease-in-out;
        display: grid;
        gap: 20px;
    `;

    const pageContentStyle = css`
        display: grid;
        gap: 20px;
        @media (min-width: 375px) {
            width: 50%;
            margin: 0 auto;
        }
    `;

    return (
        <div css={pageStyle}>
            {disableHeader ? null : <GlobalHeader />}
            <div css={pageContentStyle}>{children}</div>
        </div>
    );
};
