import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import {
  selectArticles,
  selectIsLoadingArticles,
  selectWorld,
} from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import "./worldStatistics.scss";

export function WorldStatistics() {
  const articles = useSelector(selectArticles);
  const isLoadingArticles = useSelector(selectIsLoadingArticles);
  const world = useSelector(selectWorld);
  const worldAnvilAPI = useWorldAnvilAPI();

  const countEntityClasses = () => {
    const entityClassCounts: Record<string, number> = {};

    articles.forEach((article) => {
      const { entityClass } = article;

      if (entityClassCounts[entityClass]) {
        entityClassCounts[entityClass]++;
      } else {
        entityClassCounts[entityClass] = 1;
      }
    });

    return entityClassCounts;
  };

  const entityClassCounts = countEntityClasses();

  // Create the data array for the PieChart
  const data = Object.entries(entityClassCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // total article count
  // article type graph
  // number of followers
  // number of maps
  return (
    <div className="world-statistics-container">
      <div className="world-stats">
        <h2>World Statistics</h2>
        <div className="row">
          <div className="col">
            <dt>Current World</dt>
            <dd>{world.title}</dd>
          </div>
          <div className="col">
            <dt>Followers</dt>
            <dd>{world.countFollowers}</dd>
          </div>
          <div className="col">
            <dt>Number of Articles</dt>
            <dd>{articles.length}</dd>
          </div>
          <div className="col">
            <dt>Number of Maps</dt>
            <dd>{world.countMaps}</dd>
          </div>
          <div className="col">
            <dt>Number of Timelines</dt>
            <dd>{world.countTimelines}</dd>
          </div>
        </div>
      </div>
      <hr />
      <div className="article-stats">
        <h2>Article Stats</h2>
        <div className="row">
          <div className="col-2" style={{ height: 900 }}>
            <h5>Types Breakdown</h5>
            <dl className="article-type-list">
              {Object.entries(entityClassCounts).map(([entityClass, count]) => (
                <div key={entityClass} className="article-type-list-count">
                  <dt>{entityClass}:</dt>
                  <dd>{count}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="col-10">
            <ResponsiveContainer>
              <PieChart>
                {" "}
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={300}
                  fill="#8884d8"
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    console.log("handling label?");
                    const RADIAN = Math.PI / 180;
                    const radius =
                      25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#8884d8"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {data[index].name} ({value})
                      </text>
                    );
                  }}
                />
                <Legend verticalAlign="top" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
