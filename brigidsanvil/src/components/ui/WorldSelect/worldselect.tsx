// WorldSelect.tsx

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectWorlds, selectWorld } from "@/components/store/apiSlice";
import { Form, Button } from "react-bootstrap";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";

const WorldSelect = () => {
  const worlds = useSelector(selectWorlds);
  const [selectedWorld, setSelectedWorld] = useState("");
  const worldAnvilAPI = useWorldAnvilAPI();

  const submitWorldSelect = (event: any) => {
    event.preventDefault();
    console.log(selectedWorld);
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
