import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";
import { DateTime } from "luxon";
import { getDateTime } from "../../Table/table-helpers";

export function ArticleCreationDatePieChart({
  articles,
}: {
  articles: Article[];
}) {
  const countCreationDateIntervals = () => {
    const creationDateIntervals: Record<string, number> = {};

    articles.forEach((article) => {
      const { creationDate } = article;
      if (!creationDate) {
        if (creationDateIntervals["Null"]) {
          creationDateIntervals["Null"]++;
        } else {
          creationDateIntervals["Null"] = 1;
        }
      } else if (creationDate) {
        const dateString = String(creationDate.date);
        const localDateTime = getDateTime(dateString);
        if (!localDateTime) {
          if (creationDateIntervals["Null"]) {
            creationDateIntervals["Null"]++;
          } else {
            creationDateIntervals["Null"] = 1;
          }
          return;
        }

        const startOfInterval = localDateTime
          .startOf("quarter")
          .toFormat("MMM");
        const endOfInterval = localDateTime
          .startOf("quarter")
          .plus({ month: 2 })
          .toFormat("MMM yy");
        const intervalKey = `${startOfInterval} - ${endOfInterval}`;

        if (creationDateIntervals[intervalKey]) {
          creationDateIntervals[intervalKey]++;
        } else {
          creationDateIntervals[intervalKey] = 1;
        }
      }
    });

    return creationDateIntervals;
  };

  const creationDateIntervals = countCreationDateIntervals();

  const data = Object.entries(creationDateIntervals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>{`By Creation Date`}</h5>
        <dl className="article-date-list">
          {Object.entries(creationDateIntervals)
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
