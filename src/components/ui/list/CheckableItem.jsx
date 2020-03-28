import React from "react";
import { css } from "@emotion/core";
import { List } from "../../../components";

export const CheckableItem = ({ label, onClick, checked = false }) => {
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

    const getContentStyles = () => {
        let styles = [contentStyle];

        if (checked) {
            styles.push(checkedStyle);
        }

        return styles;
    };

    return (
        <List.Item
            style={List.ITEM_CONFIGURATION.STYLE.BACKGROUND}
            onClick={onClick}
        >
            <div css={getContentStyles}>
                {label}
                <ion-icon name="checkmark-circle-outline" />
            </div>
        </List.Item>
    );
};
