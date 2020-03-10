import React from "react";
import { css } from "@emotion/core";

export const FieldGroup = ({ children }) => {
    const style = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    `;
    return <div css={style}>{children}</div>;
};
