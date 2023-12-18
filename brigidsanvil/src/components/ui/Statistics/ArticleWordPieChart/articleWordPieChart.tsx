import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticleWordPieChart({ articles }: { articles: Article[] }) {
  const countEntityClasses = () => {
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

    // Calculate average word count for each entity class
    for (const entityClass in entityClassCounts) {
      const { total, count } = entityClassCounts[entityClass];
      entityClassAverages[entityClass] =
        Math.round((total / count) * 100) / 100;
    }

    return entityClassAverages;
  };

  const entityClassAverages = countEntityClasses();

  const data = Object.entries(entityClassAverages).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
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
        <ResponsiveContainer width="100%" height="100%">
          <PieChartComponent data={data}></PieChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
