// WorldSelect.tsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWorlds,
  selectWorld,
  selectArticles,
  setArticles,
} from "@/components/store/apiSlice";
import { Form, Button } from "react-bootstrap";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";

const WorldSelect = () => {
  const world = useSelector(selectWorld);
  const worlds = useSelector(selectWorlds);
  const articles = useSelector(selectArticles);
  const [selectedWorld, setSelectedWorld] = useState("");
  const worldAnvilAPI = useWorldAnvilAPI();
  const dispatch = useDispatch();

  const submitWorldSelect = (event: any) => {
    event.preventDefault();
    if (world.id && articles.length > 1) {
      dispatch(
        setArticles([
          {
            id: "",
            title: "",
            slug: "",
            state: "",
            isWip: false,
            isDraft: false,
            entityClass: "",
            icon: "",
            url: "",
            subscribergroups: [],
            folderId: "",
            tags: "",
            updateDate: {
              date: "",
              timezone_type: 0,
              timezone: "",
            },
          },
        ])
      );
    }
    worldAnvilAPI.getWorld(selectedWorld);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Form onSubmit={submitWorldSelect}>
            <Form.Select
              aria-label="Select a World"
              value={selectedWorld}
              onChange={(e) => setSelectedWorld(e.target.value)}
            >
              <option>Choose a World</option>
              {worlds.entities.map((world) => (
                <option key={world.id} value={world.id}>
                  {world.title}
                </option>
              ))}
            </Form.Select>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WorldSelect;
