import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";
import { DateTime } from "luxon";

export function ArticlePublicationDatePieChart({
  articles,
}: {
  articles: Article[];
}) {
  const countPublicationDateIntervals = () => {
    const publicationDateIntervals: Record<string, number> = {};

    articles.forEach((article) => {
      const { publicationDate } = article;
      if (!publicationDate) {
        if (publicationDateIntervals["Unpublished"]) {
          publicationDateIntervals["Unpublished"]++;
        } else {
          publicationDateIntervals["Unpublished"] = 1;
        }
      } else if (publicationDate) {
        const dateString = String(publicationDate.date);
        const inputDateString = dateString.substring(0, dateString.length - 7);
        const dateTime = DateTime.fromFormat(
          inputDateString,
          "yyyy-MM-dd HH:mm:ss",
          { zone: "utc" }
        );
        const localDateTime = dateTime.toLocal();
        const startOfInterval = localDateTime
          .startOf("quarter")
          .toFormat("MMM");
        const endOfInterval = localDateTime
          .startOf("quarter")
          .plus({ month: 2 })
          .toFormat("MMM yy");
        const intervalKey = `${startOfInterval} - ${endOfInterval}`;

        if (publicationDateIntervals[intervalKey]) {
          publicationDateIntervals[intervalKey]++;
        } else {
          publicationDateIntervals[intervalKey] = 1;
        }
      }
    });

    return publicationDateIntervals;
  };

  const publicationDateIntervals = countPublicationDateIntervals();

  const data = Object.entries(publicationDateIntervals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>{`By Publication Date`}</h5>
        <dl className="article-date-list">
          {Object.entries(publicationDateIntervals)
            .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
            .map(([entityClass, count]) => (
              <div key={entityClass} className="article-date-list-count">
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
