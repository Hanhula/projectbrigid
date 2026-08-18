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
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, Modal, Navbar } from "react-bootstrap";

library.add(fas);
import "rpg-awesome/css/rpg-awesome.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import Cookies from "universal-cookie";
import persistStoreWrapper, { AppStore } from "@/components/store/store";
import {
  BarChart3,
  BookOpen,
  Boxes,
  ExternalLink,
  FilePlus2,
  FileText,
  Github,
  Home,
  Link2,
  LogOut,
  Menu,
  MessageCircle,
  PencilLine,
  Search,
  Settings2,
  Trash2,
  User,
  Zap,
} from "lucide-react";

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
            <Navbar.Toggle aria-controls="primary-navbar-nav">
              <Menu size={20} aria-hidden="true" />
              <span className="visually-hidden">Toggle navigation</span>
            </Navbar.Toggle>

            <Navbar.Collapse id="primary-navbar-nav">
              <Nav className="primary-nav">
                <Nav.Item>
                  <Nav.Link as={Link} eventKey="1" href="/" title="Go to Home">
                    <Home size={16} aria-hidden="true" />
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/apitool"
                    disabled={!world.success && articles.length > 1}
                    title="Browse and edit articles"
                  >
                    <BookOpen size={16} aria-hidden="true" />
                    Articles Explorer
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/statistics"
                    disabled={!world.success && articles.length > 1}
                    title="View world statistics"
                  >
                    <BarChart3 size={16} aria-hidden="true" />
                    World Statistics
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/search"
                    title="Search this world"
                  >
                    <Search size={16} aria-hidden="true" />
                    Search
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/quickcreate"
                    title="Create a simple article quickly"
                  >
                    <Zap size={16} aria-hidden="true" />
                    Quick Create
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/fullcreate"
                    title="Create an article in the full editor"
                  >
                    <FilePlus2 size={16} aria-hidden="true" />
                    Full Create
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="1"
                    href="/worldanvil/local-drafts"
                    title="Open locally stored drafts"
                  >
                    <PencilLine size={16} aria-hidden="true" />
                    Local Drafts
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
                      <Boxes size={16} aria-hidden="true" />
                      <dd>{`World: `}</dd>
                      <dt>{world.title}</dt>
                    </div>
                  </Nav.Item>
                )}
              </Nav>
            </Navbar.Collapse>
            <div className="navbar-utility">
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="navbar-more-menu"
                  title="More tools and links"
                  aria-label="More tools and links"
                >
                  <Settings2 size={17} aria-hidden="true" />
                  <span className="d-none d-sm-inline ms-1">More</span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Header>Tools</Dropdown.Header>
                  <Dropdown.Item
                    as={Link}
                    href="/worldanvil/quicklinks"
                    title="Open Quick Links"
                  >
                    <Link2 size={16} aria-hidden="true" />
                    Quick Links
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    href="/worldanvil/markdownpreview"
                    title="Open Markdown Preview"
                  >
                    <FileText size={16} aria-hidden="true" />
                    Markdown Preview
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as="a"
                    href="https://github.com/Hanhula/projectbrigid"
                    target="_blank"
                    rel="noreferrer"
                    title="View Project Brigid on GitHub"
                  >
                    <Github size={16} aria-hidden="true" />
                    GitHub
                    <ExternalLink size={13} aria-hidden="true" />
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Community</Dropdown.Header>
                  <Dropdown.Item
                    as="a"
                    href="https://bsky.app/profile/brigid.hanhula.com"
                    title="Open Bluesky"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    Bluesky
                    <ExternalLink size={13} aria-hidden="true" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="a"
                    href="https://discord.gg/KKtKuyqwFs"
                    title="Open Discord"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    Discord
                    <ExternalLink size={13} aria-hidden="true" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="a"
                    href="https://ko-fi.com/hanhula"
                    title="Open Support Me"
                  >
                    <Zap size={16} aria-hidden="true" />
                    Support Me
                    <ExternalLink size={13} aria-hidden="true" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {identity.success && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="primary"
                    id="account-actions-dropdown"
                    title={`Account: ${identity.username}`}
                    aria-label={`Account: ${identity.username}`}
                  >
                    <User size={17} aria-hidden="true" />
                    <span className="d-none d-sm-inline ms-1">Account</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Header>{identity.username}</Dropdown.Header>
                    <Dropdown.Item
                      onClick={() => logoutButton()}
                      title="Log out"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Log out
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => setShowClearModal(true)}
                      title="Clear locally stored app data"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      Clear data
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
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
