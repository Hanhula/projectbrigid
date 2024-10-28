import { Identity } from "@/types/user";
import { World } from "@/types/world";
import { getWorlds } from "@/utils/apiUtils";
import React, { useState } from "react";
import { Dropdown, Button, Container } from "react-bootstrap";

const WorldSelect: React.FC = () => {
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [worlds, setWorlds] = useState<World[]>([]);

  const handleSelect = (eventKey: string | null) => {
    setSelectedWorld(eventKey);
  };

  const handleSubmit = () => {
    console.log(`Selected world: ${selectedWorld}`);
    storage.setItem("local:selectedWorld", selectedWorld);
  };

  const handleRefresh = async () => {
    const identity: Identity | null = await storage.getItem("local:identity");
    if (identity) {
      getWorlds(identity.id).then((worldData) => {
        if (worldData.success) {
          const worlds: World[] = worldData.entities;
          storage.setItem("local:worlds", worlds);
          setWorlds(worlds);
        }
      });
    }
  };

  return (
    <Container className="world-select-container">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedWorld || "Select a world"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {worlds.map((world, index) => (
            <Dropdown.Item key={index} eventKey={world.title}>
              {world.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="primary" onClick={handleSubmit} className="m-2">
        Submit
      </Button>
      <Button variant="secondary" onClick={handleRefresh}>
        Refresh
      </Button>
    </Container>
  );
};

export default WorldSelect;
