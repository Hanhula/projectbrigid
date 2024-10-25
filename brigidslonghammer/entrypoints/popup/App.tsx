import UserAuth from "@/components/UserAuth";
import { Button } from "react-bootstrap";

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
        <h1>Brigid's Longhammer</h1>
        <div className="brigid-auth">
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
