import React from "react";
import { css } from "@emotion/core";
import { List } from "../../../components";
import { Default } from "../../../themes";

export const CheckableItem = ({ label, onClick, checked = false, disabled = false }) => {
    const contentStyle = css`
        display: flex;
        justify-content: space-between;
        ion-icon {
            width: ${Default.icon.size.medium};
            height: ${Default.icon.size.medium};
        }
    `;

    const checkedStyle = css`
        ion-icon {
            color: #25b95a;
        }
    `;

    const disabledStyle = css`
        color: ${Default.color};
        background-color: ${Default.backgroundColor.grayLight};
    `;

    // const styles = {
    //     list: [
    //         [checkedStyle, checked],
    //         [disabledStyle, disabled]
    //     ]
    // };

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
        <List.Item style={List.ITEM_CONFIGURATION.STYLE.BACKGROUND} onClick={onClick}>
            <div css={getContentStyles}>
                {label}
                <ion-icon name="checkmark-circle-outline" />
            </div>
        </List.Item>
    );
};
