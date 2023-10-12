import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectIdentity } from "@/components/store/apiSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { selectAuthToken, setAuthToken } from "@/components/store/authSlice";

const IdentityForm = () => {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const [placeholderToken, setPlaceholderToken] = useState("");

  const worldAnvilAPI = useWorldAnvilAPI();

  useEffect(() => {
    const fetchData = async () => {
      if (authToken && !identity.success) {
        try {
          const identityData = await worldAnvilAPI.verifyIdentity();
          await worldAnvilAPI.getWorlds(identityData.id);
        } catch (error) {
          setPlaceholderToken("");
          dispatch(setAuthToken(null));
          console.error(error);
        }
      }
    };

    fetchData();
  }, [authToken, identity.success, worldAnvilAPI, dispatch]);

  const setupAuthentication = async (event: any) => {
    event.preventDefault();
    console.log(placeholderToken);
    dispatch(setAuthToken(placeholderToken));
  };

  return (
    <Form onSubmit={setupAuthentication}>
      <Form.Group className="mb-3" controlId="formAuthToken">
        {
          "To be able to collect your articles, we need your authentication token. It's good practice to create a new authentication token for every new application, and to delete them when you're done - just in case."
        }
        <br />
        <br />
        <Form.Label>Authentication Token</Form.Label>
        <Form.Control
          type="string"
          placeholder="Enter WorldAnvil Authentication Token"
          value={placeholderToken}
          onChange={(e) => setPlaceholderToken(e.target.value)}
        />
        <Form.Text className="text-muted">
          {"Do not share this with anyone else!"}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default IdentityForm;
