import { Control } from "../../../components";
import { css } from "@emotion/core";

export const Link = ({ to, children }) => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        &:hover {
            transform: scale(1.025);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
        }
    `;

    const iconStyle = css`
        color: black;
    `;

    return (
        <Control.LinkWrapper to={to}>
            <div css={containerStyle}>
                {children}
                <ion-icon
                    name="arrow-forward-outline"
                    css={iconStyle}
                ></ion-icon>
            </div>
        </Control.LinkWrapper>
    );
};
