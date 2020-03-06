import React, { useEffect } from "react";
import { AbstractPage } from "../../containers";
import { GlobalHeader } from "../../components";
import { List, ListItemLink } from "../../components/ui/list";
import { Spinner } from "../../components/ui/general";
import {
    PageHeader,
    PageSection,
    PAGE_SECTION_AREA
} from "../../components/ui/page";
import { useParams } from "react-router";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";
import { Bar, BarSection } from "../../components/ui/bar";
import { LinkWrapper } from "../../components/ui/controls";
import { AbstractGroupPage } from "./AbstractGroupPage";

export const GroupMemberListPage = () => {
    const { groupId } = useParams();
    const [members, setMembers] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const { user } = useAuthSession();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "groups/" + groupId + "/members", {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setMembers(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    const memberListItems = () => {
        if (!members || !members.length) {
            return null;
        }

        return members.map((member, index) => (
            <ListItemLink key={index} to={`/profiles/${member.id}`}>
                <div>
                    {member.firstName} {member.lastName}
                </div>
                {/* <div>{member.role}</div> */}
            </ListItemLink>
        ));
    };

    // const newRecipeButton = () => {
    //     if (!user || !user.uid === profileId) {
    //         return null;
    //     }
    //     return (
    //         <LinkWrapper to="/recipe/new">
    //             <Button color={BUTTON_COLOR.GREEN}>
    //                 New Recipe
    //                 <ion-icon name="add-circle-outline" />
    //             </Button>
    //         </LinkWrapper>
    //     );
    // };

    return (
        <AbstractGroupPage>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Group Members" />
                {waiting ? (
                    <Spinner />
                ) : (
                    <List emptyText="Members will appear in this list.">
                        {memberListItems()}
                    </List>
                )}
            </PageSection>
        </AbstractGroupPage>
    );
};
