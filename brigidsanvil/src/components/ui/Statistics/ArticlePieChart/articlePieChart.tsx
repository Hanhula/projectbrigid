import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticlePieChart({ articles }: { articles: Article[] }) {
  const entityClassCounts = useMemo(() => {
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
  }, [articles]);

  const data = useMemo(
    () =>
      Object.entries(entityClassCounts).map(([name, value]) => ({
        name,
        value,
      })),
    [entityClassCounts]
  );

  return (
    <div className="row align-items-start">
      <div className="col-md-2" style={{ minHeight: 280 }}>
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
        <PieChartComponent data={data}></PieChartComponent>
      </div>
    </div>
  );
}
