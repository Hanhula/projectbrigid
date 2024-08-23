import { ResponsiveContainer } from "recharts";
import { PieChartComponent } from "../PieChart/pieChart";
import { Article } from "@/components/types/article";

export default function ArticleLengthPieChart({
  articles,
}: {
  articles: Article[];
}) {
  const countWordCountIntervals = () => {
    const intervals = [0, 50, 500, 1000, 1500, 2000, 2500, 5000, 9000];
    const wordCountIntervals: Record<string, number> = {};

    articles.forEach((article) => {
      const { wordcount } = article;
      let intervalKey = ">9000";

      for (let i = 0; i < intervals.length; i++) {
        if (wordcount! <= intervals[i]) {
          intervalKey = `${intervals[i - 1] || 0}-${intervals[i]}`;
          break;
        }
      }

      if (wordCountIntervals[intervalKey]) {
        wordCountIntervals[intervalKey]++;
      } else {
        wordCountIntervals[intervalKey] = 1;
      }
    });

    return wordCountIntervals;
  };

  const wordCountIntervals = countWordCountIntervals();

  const data = Object.entries(wordCountIntervals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="row">
      <div className="col-md-2" style={{ height: 900 }}>
        <h5>{`Word Count Intervals`}</h5>
        <dl className="article-wordcount-list">
          {Object.entries(wordCountIntervals)
            .sort(
              (a, b) => Number(a[0].split("-")[0]) - Number(b[0].split("-")[0])
            ) // Sort by interval in ascending order
            .map(([interval, count]) => (
              <div key={interval} className="article-wordcount-list-count">
                <dt>{`${interval}:`}</dt>
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
