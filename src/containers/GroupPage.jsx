import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../configuration";
import { AbstractPage } from "../containers";
import { useAuthSession } from "../hooks/useAuthSession";
import { Group, GlobalHeader } from "../components";
import { Spinner } from "../components/ui/general";
import { PageHeader } from "../components/ui/page";
import { LinkWrapper } from "../components/ui/controls";

export const GroupPage = () => {
    const { user } = useAuthSession();
    const [group, setGroup] = useState({});
    const [waiting, setWaiting] = useState(true);
    let { groupId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "groups/" + groupId, {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setGroup(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    // const canEditGroup = () => {
    //     if (!user || !group?.members) {
    //         return false;
    //     }

    //     return group.members.find(member => {
    //         return (
    //             (member.role === "owner" || member.role === "contributor") &&
    //             member.id === user.uid
    //         );
    //     });
    // };

    return (
        <AbstractPage>
            <PageHeader title="Group Profile">
                {/* {canEditGroup() ? <EditRecipeButton id={group.id} /> : null} */}
            </PageHeader>
            {waiting ? (
                <Spinner />
            ) : (
                <div>
                    <div>{group.name}</div>
                    <LinkWrapper to={`/groups/${groupId}/recipes`}>
                        Recipes
                    </LinkWrapper>
                    <LinkWrapper to={`/groups/${groupId}/members`}>
                        Members
                    </LinkWrapper>
                </div>
            )}
        </AbstractPage>
    );
};
