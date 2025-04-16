import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";
import { DateTime } from "luxon";
import { getDateTime } from "../../Table/table-helpers";

export function ArticleUpdateDatePieChart({
  articles,
}: {
  articles: Article[];
}) {
  const countUpdateDateIntervals = () => {
    const updateDateIntervals: Record<string, number> = {};

    articles.forEach((article) => {
      const { updateDate } = article;
      const dateString = String(updateDate!.date);
      const localDateTime = getDateTime(dateString);
      if (!localDateTime) {
        return;
      }

      const startOfInterval = localDateTime.startOf("quarter").toFormat("MMM");
      const endOfInterval = localDateTime
        .startOf("quarter")
        .plus({ month: 2 })
        .toFormat("MMM yy");
      const intervalKey = `${startOfInterval} - ${endOfInterval}`;

      if (updateDateIntervals[intervalKey]) {
        updateDateIntervals[intervalKey]++;
      } else {
        updateDateIntervals[intervalKey] = 1;
      }
    });

    return updateDateIntervals;
  };

  const updateDateIntervals = countUpdateDateIntervals();

  const data = Object.entries(updateDateIntervals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>{`By Update Date`}</h5>
        <dl className="article-date-list">
          {Object.entries(updateDateIntervals)
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
