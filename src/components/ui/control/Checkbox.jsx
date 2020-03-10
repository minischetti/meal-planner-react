import React from "react";
import { css } from "@emotion/core";

export const Checkbox = (({ checked = false, checkedCallback, label }) => {
    const base = css`
        -webkit-appearance: none;
        appearance: none;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        user-select: none;
    `;

    const unchecked = css`
        ion-icon {
            opacity: .5;
        }
    `;

    const getStyles = () => {
        let styles = [base];

        if (!checked) {
            styles.push(unchecked);
        }

        return styles;
    }

    const handleClick = () => {
        checkedCallback(!checked);
    }

    const handleKeyUp = event => {
        /**
         * TODO: Scrolling occurs on spacebar press without preventDefault on keyDown event. With
         * it, the keyUp event doesn't fire.
         */
        if (event.keyCode === 32) {
            checkedCallback(!checked);
        }
    }

    return (
        <div css={getStyles()} onClick={handleClick} onKeyPress={handleKeyUp} tabIndex="0">
            <ion-icon name="checkbox-outline" />
            <span>{label}</span>
        </div>
    )
});