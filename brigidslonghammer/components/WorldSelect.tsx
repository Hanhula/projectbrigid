import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

const WorldSelect: React.FC = () => {
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [worlds, setWorlds] = useState<string[]>(["Earth", "Mars", "Venus"]);

  const handleSelect = (eventKey: string | null) => {
    setSelectedWorld(eventKey);
  };

  const handleSubmit = () => {
    alert(`Selected world: ${selectedWorld}`);
  };

  const handleRefresh = () => {
    // Logic to refresh the list of worlds
    setWorlds(["Earth", "Mars", "Venus", "Jupiter"]);
  };

  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedWorld || "Select a world"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {worlds.map((world, index) => (
            <Dropdown.Item key={index} eventKey={world}>
              {world}
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
    </div>
  );
};

export default WorldSelect;
