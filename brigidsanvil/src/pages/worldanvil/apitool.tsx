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

const APITool = () => {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const worlds = useSelector(selectWorlds);
  const world = useSelector(selectWorld);

  return (
    <div className="container">
      {authToken && identity.success && (
        <div className="row">
          <div className="col">
            <h1>WorldAnvil Tools</h1>
            Page under construction!
            <hr />
            {worlds.success && !world.success && <WorldSelect />}
            {world.success && <Articles />}
          </div>
        </div>
      )}
    </div>
  );
};

export default APITool;
