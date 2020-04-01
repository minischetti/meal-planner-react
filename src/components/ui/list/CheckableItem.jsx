import React from "react";
import { css } from "@emotion/core";
import { List } from "../../../components";

export const CheckableItem = ({ label, checked = false, checkedCallback, disabled }) => {
    const containerStyle = css`
        cursor: pointer;
        user-select: none;
    `;
    const contentStyle = css`
        display: flex;
        justify-content: space-between;
        ion-icon {
            width: 24px;
            height: 24px;
        }
    `;

    const checkedStyle = css`
        ion-icon {
            color: #25b95a;
        }
    `;

    const disabledStyle = css`
        color: #ccc;
        background-color: #ececec;
    `;

    const toggleCheckStatus = () => checkedCallback(!checked);

    const getContentStyles = () => {
        let styles = [contentStyle];

        let styleConditions = new Map([
            [checkedStyle, checked],
            [disabledStyle, disabled]
        ]);

        for (let [style, condition] of Object.entries(styleConditions)) {
            if (condition) {
                styles.push(style);
            }
        }

        return styles;
    };

    return (
        <div css={containerStyle} onClick={toggleCheckStatus}>
            <List.Item style={List.ITEM_CONFIGURATION.STYLE.BACKGROUND} onClick={toggleCheckStatus}>
                <div css={getContentStyles()}>
                    {label}
                    {/* <ion-icon name="checkmark-circle-outline" /> */}
                </div>
            </List.Item>
        </div>
    );
};
