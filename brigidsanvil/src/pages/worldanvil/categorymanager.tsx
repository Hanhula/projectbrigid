import {
  selectIsLoadingCategories,
  selectWorld,
} from "@/components/store/apiSlice";
import Head from "next/head";
import React, { ReactNode } from "react";
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useDispatch, useSelector } from "react-redux";
import "./search.scss";
import { Category } from "@/components/types/category";
import {
  selectCurrentCategoryDetailStateByWorld,
  selectWorldCategoriesByWorld,
  setCategoryDetailState,
} from "@/components/store/categoriesSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";

import "./categorymanager.scss";

interface NestedCategory extends Category {
  children: NestedCategory[];
}

interface CustomToggleProps {
  children: ReactNode;
  eventKey: string;
}

function CustomToggle({ children, eventKey }: CustomToggleProps) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <Button variant="link" onClick={decoratedOnClick}>
      {children}
    </Button>
  );
}

function CategoryManager() {
  const world = useSelector(selectWorld);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);
  const worldCategories = useSelector(selectWorldCategoriesByWorld(world.id));
  const categories = worldCategories!.categories;
  const worldAnvilAPI = useWorldAnvilAPI();
  const dispatch = useDispatch();
  const currentCategoryDetailState = useSelector(
    selectCurrentCategoryDetailStateByWorld(world.id)
  );

  const setCategoryDetailLevel = (checked: boolean) => {
    dispatch(setCategoryDetailState({ world: world, isFullDetail: checked }));
  };

  // Modify the createNestedStructure function to use NestedCategory
  function createNestedStructure(categories: Category[]): NestedCategory[] {
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

  // Modify the CategoryItem component to use NestedCategory
  function CategoryItem({ category }: { category: NestedCategory }) {
    return (
      <Card>
        <Card.Header>
          <CustomToggle eventKey={category.id.toString()}>
            {category.title}
          </CustomToggle>

          {category.position !== undefined && (
            <span className="m-2">Position: {category.position}</span>
          )}
          <span className="m-2">
            Child Categories: {category.children.length}
          </span>
          <span className="m-2">
            Child Articles: {category.articles ? category.articles.length : 0}
          </span>
        </Card.Header>
        <Accordion.Collapse eventKey={category.id.toString()}>
          <Card.Body>
            {category.children.length > 0 && (
              <Accordion alwaysOpen>
                {category.children.map((child) => (
                  <CategoryItem key={child.id} category={child} />
                ))}
              </Accordion>
            )}
            {category.articles && category.articles.length > 0 && (
              <ul>
                {category.articles.map((article, index) => (
                  <li key={index} className="category-list-item list-article">
                    {article.title}
                  </li>
                ))}
              </ul>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  // Usage in CategoryManager component
  const nestedCategories = createNestedStructure(categories);

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
                worldAnvilAPI.getCategories(50, 0, 0);
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
            </Form>
          </div>
          {nestedCategories && (
            <Accordion alwaysOpen>
              {nestedCategories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </Container>
  );
}

export default CategoryManager;
