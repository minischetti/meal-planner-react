import React from "react";
import { css } from "@emotion/core";
import { GlobalHeader } from "../components/GlobalHeader";
import { PAGE_SECTION_AREA } from "../components/ui/page";

export const AbstractPage = ({ children, disableGlobalHeader = false }) => {
    const pageStyle = css`
        font-family: "Lato", sans-serif;
        transition: 0.5s all ease-in-out;
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
    `;

    const pageContentStyle = css`
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-areas: "${PAGE_SECTION_AREA.LEFT} ${PAGE_SECTION_AREA.MAIN} ${PAGE_SECTION_AREA.MAIN}";
        @media (min-width: 375px) {
            width: 60%;
            margin: 0 auto;
        }
    `;

    return (
        <div css={pageStyle}>
            {disableGlobalHeader ? null : <GlobalHeader />}
            <div css={pageContentStyle}>{children}</div>
        </div>
    );
};
