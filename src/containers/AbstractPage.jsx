import React from "react";
import { css } from "@emotion/core";
import { GlobalHeader } from "../components/GlobalHeader";
import { PageSection, PAGE_SECTION_AREA } from "../components/ui/page";

export const AbstractPage = ({ children, disableHeader = false }) => {
    const pageStyle = css`
        font-family: "Lato", sans-serif;
        transition: 0.5s all ease-in-out;
        display: grid;
        gap: 20px;
        grid-template-areas:
            "${PAGE_SECTION_AREA.GLOBAL} ${PAGE_SECTION_AREA.GLOBAL} ${PAGE_SECTION_AREA.GLOBAL}"
            "${PAGE_SECTION_AREA.HEADER} ${PAGE_SECTION_AREA.HEADER} ${PAGE_SECTION_AREA.HEADER}"
            "${PAGE_SECTION_AREA.MAIN} ${PAGE_SECTION_AREA.MAIN} ${PAGE_SECTION_AREA.RIGHT}";
        grid-template-columns: 1fr 2fr 1fr;

        @media (min-width: 375px) {
            width: 75%;
            margin: 0 auto;
        }
    `;

    return (
        <div css={pageStyle}>
            {disableHeader ? null : (
                <PageSection area={PAGE_SECTION_AREA.GLOBAL}>
                    <GlobalHeader />
                </PageSection>
            )}
            {children}
        </div>
    );
};
