import { LinkWrapper } from "../controls/LinkWrapper";
import { css } from "@emotion/core";

export const ListItemLink = ({ to, children }) => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        transition: 0.15s all ease-in-out;
        &:hover {
            transform: scale(1.025);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
        }
    `;

    const iconStyle = css`
        color: black;
    `;

    return (
        <LinkWrapper to={to}>
            <div css={containerStyle}>
                {children}
                <ion-icon
                    name="arrow-forward-outline"
                    css={iconStyle}
                ></ion-icon>
            </div>
        </LinkWrapper>
    );
};
