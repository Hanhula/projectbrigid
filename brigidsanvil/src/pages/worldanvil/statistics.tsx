import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import { WorldStatistics } from "@/components/ui/Statistics/worldStatistics";
import { useSelector } from "react-redux";

export default function Statistics() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  return (
    <div>
      {authToken && identity.success && (
        <div className="container">
          <h1
            className="text-center"
            style={{ marginTop: "0.3em", padding: "0.2em" }}
          >
            Statistics
          </h1>
          <WorldStatistics />
        </div>
      )}
    </div>
  );
}
