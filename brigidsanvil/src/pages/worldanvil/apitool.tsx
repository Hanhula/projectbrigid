import React from "react";
import { useSelector } from "react-redux";
import {
  selectIdentity,
  selectWorld,
  selectWorlds,
} from "@/components/store/apiSlice";

import "./apitool.scss";
import WorldSelect from "@/components/ui/WorldSelect/worldselect";
import Articles from "@/components/ui/Articles/articles";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { Container } from "react-bootstrap";

const APITool = () => {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const worlds = useSelector(selectWorlds);
  const world = useSelector(selectWorld);

  return (
    <Container className="apitool">
      <Head>
        <title>Articles Explorer</title>
      </Head>
      {authToken && identity.success && (
        <div className="row">
          <div className="col">
            <h1>Articles Explorer</h1>
            <div>
              {
                "Please note that this explorer will not show any articles before they have been fetched. You will need to fetch your articles to display them and to activate the items on the Statistics tab."
              }
            </div>
            <hr />
            {worlds.success && !world.success && <WorldSelect />}
            {world.success && <Articles />}
          </div>
        </div>
      )}
    </Container>
  );
};

export default APITool;
