import { verifyIdentity } from "@/utils/apiUtils";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles/UserAuth.css";

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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="authToken" className="auth-section">
        <Form.Label>Auth Token</Form.Label>
        <Form.Text className="text-muted">
          {"Find your token "}
          <a
            href="https://www.worldanvil.com/api/auth/key"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://www.worldanvil.com/api/auth/key", "_blank");
            }}
          >
            here
          </a>
          .
        </Form.Text>
        <Form.Control
          type="text"
          placeholder="Enter auth token"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit Auth
      </Button>
    </Form>
  );
};

export default UserAuth;
