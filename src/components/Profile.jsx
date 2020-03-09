import React from "react";

export function Profile({ profileId, name }) {
    return (
        <React.Fragment>
            <div>
                {name}
            </div>
        </React.Fragment>
    );
}
