import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticleAuthorPieChart({ articles }: { articles: Article[] }) {
  const countArticlesByAuthor = () => {
    const authorArticleCounts: Record<string, number> = {};

    articles.forEach((article) => {
      const { author } = article;
      if (author && author.title) {
        if (!authorArticleCounts[author.title]) {
          authorArticleCounts[author.title] = 1;
        } else {
          authorArticleCounts[author.title]++;
        }
      }
    });

    return authorArticleCounts;
  };

  const authorArticleCounts = countArticlesByAuthor();

  const data = Object.entries(authorArticleCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>Articles by Author Breakdown</h5>
        <dl className="article-author-list">
          {Object.entries(authorArticleCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
            .map(([author, count]) => (
              <div key={author} className="article-author-list-count">
                <dt>{author}:</dt>
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
