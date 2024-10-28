import UserAuth from "@/components/UserAuth";
import { Button, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WorldSelect from "@/components/WorldSelect";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem("local:authToken");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
    const unsubscribe = storage.watch("local:authToken", (newToken) => {
      setIsAuthenticated(!!newToken);
    });

    return () => unsubscribe();
  }, []);

  const clearAuth = () => {
    storage.removeItem("local:authToken");
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="main-container">
        <Navbar fixed="top">
          <Container>
            <Navbar.Brand>Brigid's Longhammer</Navbar.Brand>
          </Container>
        </Navbar>
        <div className="brigid-container">
          {!isAuthenticated && <UserAuth />}
          {isAuthenticated && (
            <div className="authenticated-container">
              <WorldSelect />
              <Button onClick={clearAuth}>Log Out</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
