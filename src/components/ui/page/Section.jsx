import React from "react";
import { css } from "@emotion/core";

export const Section = ({ position, children }) => {
    const style = css`
        display: grid;
        gap: 10px;
        grid-area: ${position};
        grid-auto-rows: max-content;
    `;

    return <div css={style}>{children}</div>;
};

export const SECTION_CONFIGURATION = {
    POSITION: {
        GLOBAL: "global",
        HEADER: "header",
        MAIN: "main",
        LEFT: "left",
        RIGHT: "right"
    }
};
