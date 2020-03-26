import React, { useEffect } from "react";
import { AbstractUserPage } from "../../containers";
import { useParams } from "react-router-dom";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";
import { motion, AnimatePresence } from "framer-motion";

import { Control, List, Loading, Page } from "../../components";

export const UserRecipeListPage = () => {
    const { profileId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const { user } = useAuthSession();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "people/" + profileId + "/recipes", {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setWaiting(false);
            })
            .catch(setWaiting(false));

        return () => {
            abortController.abort();
        };
    }, []);

    const recipeListItems = () => {
        return (
            <AnimatePresence>
                {!recipes || !recipes.length
                    ? null
                    : recipes.map(recipe => (
                          <motion.li
                              key={recipe.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                          >
                              <List.Link to={`/recipes/${recipe.id}`}>
                                  <div>{recipe.name}</div>
                              </List.Link>
                          </motion.li>
                      ))}
            </AnimatePresence>
        );
    };

    const newRecipeButton = () => {
        if (!user || !user.uid === profileId) {
            return null;
        }

        return (
            <Control.LinkWrapper to="/recipe/new">
                <Control.Button
                    color={Control.BUTTON_CONFIGURATION.COLOR.GREEN}
                >
                    New Recipe
                    <ion-icon name="add-circle-outline" />
                </Control.Button>
            </Control.LinkWrapper>
        );
    };

    return (
        <AbstractUserPage>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Recipes">{newRecipeButton()}</Page.Header>
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <motion.ul
                        initial={false}
                        animate={{
                            opacity: 1,
                            transition: { staggerChildren: 1 }
                        }}
                        exit={{ opacity: 0 }}
                    >
                        <List.Container emptyText="">
                            {recipeListItems()}
                        </List.Container>
                    </motion.ul>
                )}
            </Page.Section>
        </AbstractUserPage>
    );
};
