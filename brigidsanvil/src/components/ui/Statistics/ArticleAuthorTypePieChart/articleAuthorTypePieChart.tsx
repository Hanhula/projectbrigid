import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticleAuthorTypePieChart({
  articles,
}: {
  articles: Article[];
}) {
  const countArticlesPerEntityClassPerAuthor = () => {
    const entityAuthorCounts: Record<string, Record<string, number>> = {};

    articles.forEach((article) => {
      const { entityClass, author } = article;

      if (author && author.title) {
        if (!entityAuthorCounts[entityClass]) {
          entityAuthorCounts[entityClass] = {};
        }

        if (entityAuthorCounts[entityClass][author.title]) {
          entityAuthorCounts[entityClass][author.title] += 1;
        } else {
          entityAuthorCounts[entityClass][author.title] = 1;
        }
      }
    });

    return entityAuthorCounts;
  };

  const entityAuthorCounts = countArticlesPerEntityClassPerAuthor();

  const data = Object.entries(entityAuthorCounts).flatMap(
    ([entityClass, authorCounts]) =>
      Object.entries(authorCounts).map(([author, count]) => ({
        name: `${entityClass} - ${author}`,
        value: count,
      }))
  );

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>Author by Type Breakdown</h5>
        <dl className="article-author-type-list">
          {Object.entries(entityAuthorCounts)
            .sort((a, b) => b[1].value - a[1].value) // Sort by count in descending order
            .map(([entityClass, authorCounts]) => (
              <div key={entityClass}>
                <dt>{entityClass}:</dt>
                {Object.entries(authorCounts)
                  .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
                  .map(([author, count]) => (
                    <dd key={author}>
                      {author}: {count}
                    </dd>
                  ))}
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
