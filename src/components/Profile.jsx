import React from "react";
import { LinkWrapper } from "./ui/controls";

export function Profile({ profileId, firstName, lastName }) {
    return (
        <React.Fragment>
            <div>
                {firstName} {lastName}
            </div>
            <LinkWrapper to={`/profiles/${profileId}/recipes`}>
                Recipes
            </LinkWrapper>
        </React.Fragment>
    );
}
