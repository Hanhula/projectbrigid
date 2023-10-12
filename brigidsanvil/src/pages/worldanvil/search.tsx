import React, { useEffect } from "react";
import "./search.scss";

function WorldAnvilSearch() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cse.google.com/cse.js?cx=02464c1ca1fc148c7";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="search-container container">
      <div className="row">
        <div className="col">
          <h1>WorldAnvil Search</h1>
          Page under construction!
          <hr />
          <div className="gcse-search"></div>
        </div>
      </div>
    </div>
  );
}

export default WorldAnvilSearch;
