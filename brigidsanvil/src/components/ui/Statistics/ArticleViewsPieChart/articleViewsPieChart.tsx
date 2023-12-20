import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticleViewsPieChart({ articles }: { articles: Article[] }) {
  const countEntityClasses = () => {
    const entityClassCounts: Record<string, number> = {};

    articles.forEach((article) => {
      const { entityClass } = article;
      let { views } = article;

      views = views || 0;

      if (entityClassCounts[entityClass]) {
        entityClassCounts[entityClass] += views;
      } else {
        entityClassCounts[entityClass] = views;
      }
    });

    return entityClassCounts;
  };

  const entityClassCounts = countEntityClasses();

  const data = Object.entries(entityClassCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>Views by Type Breakdown</h5>
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
          <PieChartComponent data={data}></PieChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
