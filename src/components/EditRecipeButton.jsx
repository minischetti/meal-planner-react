import { css } from "@emotion/core";
import { Button, LinkWrapper } from "./ui/control";

export const EditRecipeButton = ({ id }) => {
    const iconStyle = css`
        color: black;
    `;

    return (
        <LinkWrapper to={{ pathname: `/recipes/${id}/edit` }}>
            <Button>
                Edit Recipe
                <ion-icon name="create-outline" class={iconStyle}></ion-icon>
            </Button>
        </LinkWrapper>
    );
};
