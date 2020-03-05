import React from "react";

export function Profile({ profileId, firstName, lastName }) {
    return (
        <React.Fragment>
            <div>
                {firstName} {lastName}
            </div>
        </React.Fragment>
    );
}
