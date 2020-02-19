import React from "react";
import { css } from "@emotion/core";

export const Page = ({ children }) => {
    const pageStyle = css `
        @media (min-width: 375px) {
            transition: .5s all ease-in-out;
            display: grid;
            gap: 20px;
            width: 50%;
            margin: 0 auto;
        }
    `;

    return (
        <div css={pageStyle}>
            {children}
        </div>
    )
}