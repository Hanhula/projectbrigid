import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectIdentity } from "@/components/store/apiSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { selectAuthToken, setAuthToken } from "@/components/store/authSlice";
import Cookies from "universal-cookie";

import "./identity.scss";

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
    const cookies = new Cookies();
    cookies.set("authToken", placeholderToken, { path: "/" });
    dispatch(setAuthToken(placeholderToken));
  };

  return (
    <div className="container identity-container">
      <div className="row">
        <div className="col">
          <h1>{"Brigid's Anvil"}</h1>
          <h3>{"Authentication"}</h3>
          <Form onSubmit={setupAuthentication}>
            <Form.Group className="mb-3" controlId="formAuthToken">
              {
                "To be able to collect your articles, we need your authentication token. It's good practice to create a new authentication token for every new application, and to delete them when you're done - just in case. "
              }
              <span>
                {"You can get your authentication token "}
                <a href="https://www.worldanvil.com/api/auth/key">{"here"}</a>
                {"."}
              </span>
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
        </div>
      </div>
    </div>
  );
};

export default IdentityForm;
