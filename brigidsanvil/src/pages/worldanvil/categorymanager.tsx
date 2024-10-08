import {
  selectIsLoadingCategories,
  selectWorld,
} from "@/components/store/apiSlice";
import Head from "next/head";
import React, { useState } from "react";
import { Accordion, Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./search.scss";
import { Category, NestedCategory } from "@/components/types/category";
import {
  selectCurrentCategoryDetailStateByWorld,
  selectWorldCategoriesByWorld,
  setCategoryDetailState,
} from "@/components/store/categoriesSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";

import "./categorymanager.scss";
import { CategoryItem } from "@/components/ui/Categories/category-item";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";

function CategoryManager() {
  const world = useSelector(selectWorld);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);
  const worldCategories = useSelector(selectWorldCategoriesByWorld(world.id));
  const categories = worldCategories!.categories;
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const uncategorisedArticles = articles.filter(
    (article) => !article.category && !article.articleParent
  );

  const worldAnvilAPI = useWorldAnvilAPI();
  const dispatch = useDispatch();
  const currentCategoryDetailState = useSelector(
    selectCurrentCategoryDetailStateByWorld(world.id)
  );

  const setCategoryDetailLevel = (checked: boolean) => {
    dispatch(setCategoryDetailState({ world: world, isFullDetail: checked }));
  };

  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  function createNestedStructure(): NestedCategory[] {
    const map = new Map<string, NestedCategory>();
    const root: NestedCategory[] = [];

    categories.forEach((category) => {
      map.set(category.id, { ...category, children: [] });
    });

    map.forEach((category) => {
      if (category.parent) {
        const parent = map.get(category.parent.id);
        if (parent) {
          parent.children.push(category);
          // Sort the children based on the position parameter
          parent.children.sort((a, b) => (b.position || 0) - (a.position || 0));
        } else {
          root.push(category);
        }
      } else {
        root.push(category);
      }
    });

    // Sort the root categories based on the position parameter
    root.sort((a, b) => (b.position || 0) - (a.position || 0));

    return root;
  }

  function updateCategories() {
    const now = new Date();
    const lastUpdate = localStorage.getItem("lastUpdate");
    if (
      lastUpdate &&
      now.getTime() - new Date(lastUpdate).getTime() < 60 * 60 * 1000
    ) {
      alert(
        "To prevent overload on WorldAnvil's API, you can only update your full list of categories once every hour. Please be patient and use the individual sync buttons if you need to update more frequently."
      );
      return;
    }

    localStorage.setItem("lastUpdate", now.toString());
    worldAnvilAPI.getCategories(50, 0, 0);
  }

  const nestedCategories = createNestedStructure();

  return (
    <Container className="category-manager">
      <Head>
        <title>WorldAnvil Category Manager</title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>Category Manager </h1>
          <p>Organise your categories!</p>
          <hr />
          <div className="button-container top-button-container">
            <Button
              variant="primary"
              className="fetch-button"
              onClick={() => {
                updateCategories();
              }}
            >
              Fetch All Categories
            </Button>
            {isLoadingCategories && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Request full detail?"
                checked={currentCategoryDetailState.isFullDetail}
                onChange={(e) => setCategoryDetailLevel(e.target.checked)}
              />
              <Form.Text>
                Please be aware that WorldAnvil does not have an easy way to
                fetch the full detail of only recently-updated categories. It
                will always reload every category from scratch. Please do not
                press this excessively.
              </Form.Text>
            </Form>
          </div>
          {nestedCategories && (
            <Accordion alwaysOpen>
              {nestedCategories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </Accordion>
          )}
          <div className="row">
            <div className="col">
              <h2>Uncategorised Articles</h2>
              {/* Step 3: Map over uncategorised articles and display each one in a list */}
              <ul>
                {uncategorisedArticles.map((article) => (
                  <li key={article.id}>{article.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CategoryManager;
