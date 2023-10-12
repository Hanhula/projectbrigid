import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import {
  selectArticles,
  selectIsLoadingArticles,
  selectWorld,
} from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import "./worldStatistics.scss";
import { useMediaQuery } from "react-responsive";

export function WorldStatistics() {
  const articles = useSelector(selectArticles);
  const world = useSelector(selectWorld);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

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

  const colors = [
    "#e31a1a",
    "#c3b465",
    "#E68618",
    "#46A2CC",
    "#F9C80E",
    "#7effbe",
    "#DD7B38",
    "#7887AB",
    "#B492A2",
    "#4dfd5c",
    "#439D62",
    "#ce6cf5",
    "#ECEB93",
    "#8D8741",
    "#9BC53D",
    "#FA7A35",
    "#18A75E",
    "#acecff",
    "#C4A35A",
    "#00A68C",
    "#999390",
    "#F5D0C5",
    "#BB6373",
    "#bb52a3",
    "#ff79db",
    "#E1CDA5",
    "#94D0CC",
    "#D90429",
    "#12EAEA",
    "#FF9A8B",
  ];

  let testSize = isMobile ? 100 : 300;

  const RADIAN = Math.PI / 180;

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
          <div className="col-md-2" style={{ height: 900 }}>
            <h5>Types Breakdown</h5>
            <dl className="article-type-list">
              {Object.entries(entityClassCounts)
                .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
                .map(([entityClass, count]) => (
                  <div key={entityClass} className="article-type-list-count">
                    <dt>{entityClass}:</dt>
                    <dd>{count}</dd>
                  </div>
                ))}
            </dl>
          </div>
          <div className="col-md-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {" "}
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={testSize}
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
                        fill={colors[index % colors.length]}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {data[index].name} ({value})
                      </text>
                    );
                  }}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
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
