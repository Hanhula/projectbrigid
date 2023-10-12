import { WorldStatistics } from "@/components/ui/Statistics/worldStatistics";

export default function Statistics() {
  return (
    <div>
      <div className="container">
        <h1
          className="text-center"
          style={{ marginTop: "0.3em", padding: "0.2em" }}
        >
          Statistics
        </h1>
        <WorldStatistics />
      </div>
    </div>
  );
}
