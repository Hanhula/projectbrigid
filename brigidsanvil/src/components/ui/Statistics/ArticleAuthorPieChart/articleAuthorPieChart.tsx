import { useMemo } from "react";
import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export function ArticleAuthorPieChart({ articles }: { articles: Article[] }) {
  const authorArticleCounts = useMemo(() => {
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
  }, [articles]);

  const data = useMemo(
    () =>
      Object.entries(authorArticleCounts).map(([name, value]) => ({
        name,
        value,
      })),
    [authorArticleCounts]
  );

  return (
    <div className="row align-items-start">
      <div className="col-md-2" style={{ minHeight: 280 }}>
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
        <PieChartComponent data={data}></PieChartComponent>
      </div>
    </div>
  );
}
