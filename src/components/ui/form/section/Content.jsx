import React from "react";
import { css } from "@emotion/core";

export const Content = ({
    children,
    style = CONTENT_CONFIGURATION.STYLE.BORDER
}) => {
    const base = css`
        display: grid;
        gap: 20px;
    `;

    const withBorder = css`
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
    `;

    const getStyles = () => {
        let styles = [base];

        if (style === CONTENT_CONFIGURATION.STYLE.BORDER) {
            styles.push(withBorder);
        }

        return styles;
    };

    return <div css={getStyles()}>{children}</div>;
};

export const CONTENT_CONFIGURATION = {
    STYLE: {
        BORDER: "BORDER",
        NO_BORDER: "NO_BORDER"
    }
};
