// WorldSelect.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWorlds, selectWorld } from "@/components/store/apiSlice";
import { Form, Button } from "react-bootstrap";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { setCurrentWorldArticles } from "@/components/store/articlesSlice";

const WorldSelect = () => {
  const world = useSelector(selectWorld);
  const worlds = useSelector(selectWorlds);
  const [selectedWorld, setSelectedWorld] = useState("");
  const worldAnvilAPI = useWorldAnvilAPI();
  const dispatch = useDispatch();

  const submitWorldSelect = (event: any) => {
    event.preventDefault();
    worldAnvilAPI.getWorld(selectedWorld);
  };

  useEffect(() => {
    if (world.id) {
      dispatch(setCurrentWorldArticles(world));
    }
  }, [world, dispatch]);

  return (
    <div className="container main-container">
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
