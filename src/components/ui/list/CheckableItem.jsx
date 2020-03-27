import React from "react";
import { css } from "@emotion/core";
import { List } from "../../../components";

export const CheckableItem = ({ label, onClick, checked = false }) => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border: 1px solid ${checked ? "#25b95a" : "#ddd"};
        border-radius: 8px;
        &:hover {
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
        }
        & ion-icon {
            width: 24px;
            height: 24px;
        }
    `;

    const checkedStyle = css`
        border-color: #25b95a;
    `;

    const getStyles = () => {
        let styles = [containerStyle];

        if (checked) {
            styles.push(checkedStyle);
        }

        return styles;
    };

    return (
        <List.Item>
            <div css={getStyles} onClick={onClick}>
                {label}
                <ion-icon name="checkmark-circle-outline" />
            </div>
        </List.Item>
    );
};
