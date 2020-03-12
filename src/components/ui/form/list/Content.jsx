import React from "react";
import { css } from "@emotion/core";

export const Content = ({ children }) => {
    const style = css`
        display: grid;
    `;

    return <div css={style}>{children}</div>;
};
