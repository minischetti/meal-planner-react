import { css } from "@emotion/core";

export const PAGE_SECTION_AREA = {
    GLOBAL: "global",
    HEADER: "header",
    MAIN: "main",
    LEFT: "left",
    RIGHT: "right"
};

export const PageSection = ({ area, children }) => {
    const pageSectionStyle = css`
        display: grid;
        gap: 10px;
        grid-area: ${area};
        grid-auto-rows: max-content;
    `;

    return <div css={pageSectionStyle}>{children}</div>;
};
