import { useMemo } from "react";
import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticleWordPieChart({ articles }: { articles: Article[] }) {
  const entityClassAverages = useMemo(() => {
    const entityClassCounts: Record<string, { total: number; count: number }> =
      {};
    const entityClassAverages: Record<string, number> = {};

    articles.forEach((article) => {
      const { entityClass, wordcount } = article;

      if (entityClassCounts[entityClass]) {
        entityClassCounts[entityClass].total += wordcount!;
        entityClassCounts[entityClass].count++;
      } else {
        entityClassCounts[entityClass] = { total: wordcount!, count: 1 };
      }
    });

    for (const entityClass in entityClassCounts) {
      const { total, count } = entityClassCounts[entityClass];
      entityClassAverages[entityClass] =
        Math.round((total / count) * 100) / 100;
    }

    return entityClassAverages;
  }, [articles]);

  const data = useMemo(
    () =>
      Object.entries(entityClassAverages).map(([name, value]) => ({
        name,
        value,
      })),
    [entityClassAverages]
  );

  return (
    <div className="row align-items-start">
      <div className="col-md-2" style={{ minHeight: 280 }}>
        <h5>{`Types Breakdown (By Wordcount Average)`}</h5>
        <dl className="article-type-list">
          {Object.entries(entityClassAverages)
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
