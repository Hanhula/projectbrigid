import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

import "./navbar.css";
import { selectArticles, selectWorld } from "@/components/store/apiSlice";
import { useSelector } from "react-redux";

const NavBar = () => {
  const world = useSelector(selectWorld);

  return (
    <div className="navigation">
      <Nav className="navbar-dark bg-dark">
        <Nav.Item>
          <Nav.Link as={Link} eventKey="1" href="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey="1" href="/worldanvil/apitool">
            API Tool
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            eventKey="1"
            href="/worldanvil/statistics"
            disabled={!world.success}
          >
            World Statistics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey="1" href="/worldanvil/search">
            World Search
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default NavBar;
