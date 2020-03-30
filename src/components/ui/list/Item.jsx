import React from "react";
import { css } from "@emotion/core";

export const Item = ({ children, style = ITEM_CONFIGURATION.STYLE.BORDER }) => {
    const containerStyle = css`
        padding: 20px;
        border-radius: 8px;
        &:hover {
            box-shadow: 0 0 20px #00000003;
        }
    `;

    const addBorder = css`
        border: 1px solid #ddd;
    `;

    const addBackground = css`
        background-color: #ececec;
    `;

    const getStyles = () => {
        let styles = [containerStyle];
        const { BORDER, BACKGROUND } = ITEM_CONFIGURATION.STYLE;

        switch (style) {
            case BORDER:
                styles.push(addBorder);
                break;
            case BACKGROUND:
                styles.push(addBackground);
                break;
        }

        return styles;
    };

    return <div css={getStyles()}>{children}</div>;
};

export const ITEM_CONFIGURATION = {
    STYLE: {
        BORDER: "border",
        BACKGROUND: "background"
    }
};
