import React from "react";
import { css } from "@emotion/core";

export const Section = ({ area, children }) => {
    const style = css`
        grid-area: ${area};
    `;

    return <div css={style}>{children}</div>;
};
