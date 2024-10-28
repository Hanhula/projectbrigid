import { verifyIdentity } from "@/utils/apiUtils";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UserAuth = () => {
  const [authToken, setAuthToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth token:", authToken);
    storage.setItem("local:authToken", authToken);

    verifyIdentity()
      .then((identity) => {
        storage.setItem("local:identity", identity);
        console.log(identity);
      })
      .catch((error) => {
        console.error("Error verifying identity:", error);
        storage.removeItem("local:authToken");
      });
  };

  const logToken = async () => {
    const token = await storage.getItem("local:authToken");
    console.log("Current token:", token);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="authToken">
        <Form.Label>Auth Token</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter auth token"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button onClick={logToken}>View Current Token</Button>
    </Form>
  );
};

export default UserAuth;
