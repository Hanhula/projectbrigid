import Nav from "react-bootstrap/Nav";
import Link from "next/link";

import "./navbar.scss";
import {
  selectIdentity,
  selectWorld,
  selectWorlds,
} from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import WorldSelect from "../WorldSelect/worldselect";
import { selectAuthToken } from "@/components/store/authSlice";
import IdentityForm from "../Identity/identity";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar, NavbarToggle } from "react-bootstrap";

const NavBar = () => {
  const world = useSelector(selectWorld);
  const worlds = useSelector(selectWorlds);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const identity = useSelector(selectIdentity);
  const authToken = useSelector(selectAuthToken);

  return (
    <div>
      {(!authToken || !identity.success) && <IdentityForm />}
      <div className="navigation">
        {authToken && identity.success && (
          <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Navbar.Brand as={Link} href="/">
              <i className="ra ra-anvil"> </i>
              Brigid
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} eventKey="1" href="/">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/apitool"
                    disabled={!world.success && articles.length > 1}
                  >
                    Articles Explorer
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/statistics"
                    disabled={!world.success && articles.length > 1}
                  >
                    World Statistics
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} eventKey="1" href="/worldanvil/search">
                    Search
                  </Nav.Link>
                </Nav.Item>
                {worlds.success && (
                  <Nav.Item>
                    <div className="world-selector-nav">
                      <WorldSelect></WorldSelect>
                    </div>
                  </Nav.Item>
                )}
                {world.success && (
                  <Nav.Item className="nav-current-world">
                    <div className="current-world">
                      <dd>{`Currently selected world: `}</dd>
                      <dt>{world.title}</dt>
                    </div>
                  </Nav.Item>
                )}
                <Nav.Item className="nav-dev-updates">
                  <Nav.Link href="https://bsky.app/profile/brigid.hanhula.com">
                    <FontAwesomeIcon icon={faCloud} />
                    Dev Updates
                  </Nav.Link>
                </Nav.Item>
                {identity.success && (
                  <Nav.Item className="nav-current-user">
                    <div className="current-user">
                      <dd>{"Logged in as:"}</dd>
                      <dt>{identity.username}</dt>
                    </div>
                  </Nav.Item>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </div>
    </div>
  );
};

export default NavBar;
