import Nav from "react-bootstrap/Nav";
import Link from "next/link";

import "./navbar.scss";
import {
  selectIdentity,
  selectWorld,
  selectWorlds,
} from "@/components/store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import WorldSelect from "../WorldSelect/worldselect";
import { selectAuthToken, setAuthToken } from "@/components/store/authSlice";
import IdentityForm from "../Identity/identity";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import {
  faCloud,
  faCoins,
  faSignOut,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Navbar } from "react-bootstrap";

library.add(fas);
import "rpg-awesome/css/rpg-awesome.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Cookies from "universal-cookie";

const NavBar = () => {
  const world = useSelector(selectWorld);
  const worlds = useSelector(selectWorlds);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const identity = useSelector(selectIdentity);
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  const logoutButton = async (event: any) => {
    event.preventDefault();
    const cookies = new Cookies();
    cookies.set("authToken", null, { path: "/" });
    dispatch(setAuthToken(null));
  };

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
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/quicklinks"
                  >
                    Quick Links
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/quickcreate"
                  >
                    Quick Create
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
                    Bluesky
                  </Nav.Link>
                </Nav.Item>
                {identity.success && (
                  <Nav.Item className="nav-dev-updates">
                    <Nav.Link href="https://discord.gg/KKtKuyqwFs">
                      <FontAwesomeIcon icon={faDiscord} />
                      Discord
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item className="nav-dev-updates">
                  <Nav.Link href="https://ko-fi.com/hanhula">
                    <FontAwesomeIcon icon={faCoins} />
                    Support Me!
                  </Nav.Link>
                </Nav.Item>
                {identity.success && (
                  <Nav.Item className="nav-current-user">
                    <div className="current-user">
                      <dd>{"Logged in as:"}</dd>
                      <dt>{identity.username}</dt>
                    </div>
                    <Button variant="primary" onClick={logoutButton}>
                      <FontAwesomeIcon icon={faSignOut} />
                    </Button>
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
