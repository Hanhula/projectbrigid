import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { NestedCategory } from "@/components/types/category";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import { CustomToggle } from "./custom-toggle";

export function CategoryItem({ category }: { category: NestedCategory }) {
  const worldAnvilAPI = useWorldAnvilAPI();
  const [position, setPosition] = useState(category.position);

  const handleSync = async () => {
    console.log("awaiting category update");
    await worldAnvilAPI.getCategory(category.id, true);
  };

  // Function to handle position update
  const handlePositionUpdate = useCallback(
    (newPosition: number) => {
      if (newPosition) {
        return worldAnvilAPI
          .updateCategoryByField(category.id, "position", newPosition)
          .then(() => {
            handleSync();
          });
      }
      return Promise.resolve();
    },
    [category.id, worldAnvilAPI]
  );

  const debouncedUpdate = useCallback(debounce(handlePositionUpdate, 1000), [
    handlePositionUpdate,
  ]);

  // Function to handle position change
  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("fired");
    const newPosition = Number(event.target.value);
    console.log(newPosition);
    console.log(position);
    if (newPosition && newPosition !== position) {
      setPosition(newPosition);
      debouncedUpdate(newPosition)?.then(handleSync);
    }
  };

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  // Function to handle position input key press
  const handlePositionKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (position) {
        debouncedUpdate(position)?.then(handleSync);
      }
    }
  };

  return (
    <Card>
      <Card.Header>
        <CustomToggle eventKey={category.id.toString()}>
          {category.title}
        </CustomToggle>

        {position && (
          <Badge bg="primary" className="m-1 category-position">
            <InputGroup>
              <InputGroup.Text>Position:</InputGroup.Text>
              <Form.Control
                type="number"
                value={position}
                onChange={handlePositionChange}
                onKeyDown={handlePositionKeyPress}
                inputMode="numeric"
              />
            </InputGroup>
          </Badge>
        )}
        <Badge bg="secondary" className="m-1 child-badge child-categories">
          Child categories: {category.children.length}
        </Badge>
        <Badge bg="secondary" className="m-1 child-badge child-articles">
          Child articles: {category.articles ? category.articles.length : 0}
        </Badge>
        <Button
          variant="primary"
          className="category-sync"
          onClick={handleSync}
          size="sm"
        >
          <FontAwesomeIcon icon={faSync} />
        </Button>
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
