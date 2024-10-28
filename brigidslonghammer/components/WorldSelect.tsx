import { Identity } from "@/types/user";
import { World } from "@/types/world";
import { getWorlds } from "@/utils/apiUtils";
import React, { useState } from "react";
import { Dropdown, Button, Container } from "react-bootstrap";

const WorldSelect: React.FC = () => {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [worlds, setWorlds] = useState<World[]>([]);

  const handleSelect = (eventKey: string | null) => {
    const world = worlds.find((world) => world.title === eventKey) ?? null;
    setSelectedWorld(world);
  };

  const handleSubmit = () => {
    console.log(`Selected world:`, selectedWorld);
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

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    const unsubscribe = storage.watch(
      "local:identity",
      (newIdentity: Identity | null) => {
        if (newIdentity) {
          handleRefresh();
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedWorld) {
      handleSubmit();
    }
  }, [selectedWorld]);

  return (
    <Container className="world-select-container">
      <Dropdown onSelect={handleSelect} className="m-1">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedWorld ? selectedWorld.title : "Select a world"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {worlds.map((world, index) => (
            <Dropdown.Item key={index} eventKey={world.title}>
              {world.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="secondary" onClick={handleRefresh} className="m-1">
        Refresh
      </Button>
    </Container>
  );
};

export default WorldSelect;
