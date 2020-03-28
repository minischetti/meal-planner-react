import React from "react";
import { css } from "@emotion/core";

export const Item = ({ children, onClick, style = ITEM_CONFIGURATION.STYLE.BORDER }) => {
    const containerStyle = css`
        padding: 20px;
        border-radius: 8px;
        &:hover {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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

    return <div css={getStyles} onClick={onClick}>{children}</div>;
};

export const ITEM_CONFIGURATION = {
    STYLE: {
        BORDER: "border",
        BACKGROUND: "background"
    }
};
