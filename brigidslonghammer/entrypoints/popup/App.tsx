import UserAuth from "@/components/UserAuth";
import { Button, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WorldSelect from "@/components/WorldSelect";
import { QuickCreate } from "@/components/QuickCreate";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasWorldSelected, setWorldSelected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem("local:authToken");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    const checkWorld = async () => {
      const token = await storage.getItem("local:selectedWorld");
      if (token) {
        setWorldSelected(true);
      } else {
        setWorldSelected(false);
      }
    };

    checkAuth();
    checkWorld();
    const unsubscribeAuth = storage.watch("local:authToken", (newToken) => {
      setIsAuthenticated(!!newToken);
    });
    const unsubscribeWorld = storage.watch(
      "local:selectedWorld",
      (newToken) => {
        setWorldSelected(!!newToken);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeWorld();
    };
  }, []);

  const clearAuth = () => {
    storage.removeItems([
      "local:authToken",
      "local:identity",
      "local:selectedWorld",
      "local:worlds",
    ]);
    setIsAuthenticated(false);
    setWorldSelected(false);
  };

  return (
    <>
      <div className="main-container">
        <Navbar fixed="top">
          <Container>
            <Navbar.Brand>Brigid's Longhammer</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              {isAuthenticated && (
                <Button variant="danger" onClick={clearAuth} className="md-2">
                  Log Out
                </Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="brigid-container">
          {!isAuthenticated && <UserAuth />}
          {isAuthenticated && (
            <div className="authenticated-container">
              {!hasWorldSelected && <div>Select a world</div>}
              <WorldSelect />
              {hasWorldSelected && <QuickCreate />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
