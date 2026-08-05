import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import "./navbar.scss";
import {
  resetApiState,
  selectIdentity,
  selectWorld,
  selectWorlds,
} from "@/components/store/apiSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import WorldSelect from "../WorldSelect/worldselect";
import {
  resetAuthState,
  selectAuthToken,
  setAuthToken,
} from "@/components/store/authSlice";
import IdentityForm from "../Identity/identity";
import {
  resetArticleState,
  selectWorldArticlesByWorld,
} from "@/components/store/articlesSlice";
import {
  faCloud,
  faCoins,
  faSignOut,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Modal, Navbar } from "react-bootstrap";

library.add(fas);
import "rpg-awesome/css/rpg-awesome.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Cookies from "universal-cookie";
import persistStoreWrapper, { AppStore } from "@/components/store/store";

const NavBar = () => {
  const router = useRouter();
  const world = useSelector(selectWorld);
  const worlds = useSelector(selectWorlds);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const identity = useSelector(selectIdentity);
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const store = useStore<AppStore>();
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const logoutButton = async (event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const cookies = new Cookies();
    cookies.remove("authToken", { path: "/" });
    dispatch(setAuthToken(null));
    await router.push("/");
  };

  const clearLocalData = async () => {
    setIsClearing(true);
    try {
      const cookies = new Cookies();
      cookies.remove("authToken", { path: "/" });
      cookies.remove("brigid-cookie-consent", { path: "/" });

      dispatch(setAuthToken(null));
      dispatch(resetApiState());
      dispatch(resetAuthState());
      dispatch(resetArticleState());

      if (typeof window !== "undefined") {
        window.localStorage.clear();
        window.sessionStorage.clear();

        if (window.indexedDB) {
          await new Promise<void>((resolve) => {
            const request = window.indexedDB.deleteDatabase("brigidsAnvil");
            request.onsuccess = () => resolve();
            request.onerror = () => resolve();
            request.onblocked = () => resolve();
          });
        }
      }

      const persistor = persistStoreWrapper(store);
      await persistor.purge();
      await router.push("/");
    } finally {
      setShowClearModal(false);
      setIsClearing(false);
    }
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
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/markdownpreview"
                  >
                    Markdown Preview
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
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="primary"
                        id="account-actions-dropdown"
                      >
                        <FontAwesomeIcon icon={faSignOut} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={() => logoutButton()}>
                          Log out
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => setShowClearModal(true)}
                        >
                          Clear data
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </div>
      <Modal
        show={showClearModal}
        onHide={() => setShowClearModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Clear local data?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will log you out and wipe the locally stored app data in this
          browser. It will not affect anything on WorldAnvil.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={clearLocalData}
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "OK"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavBar;
