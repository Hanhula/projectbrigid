import { selectWorld } from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import "./worldStatistics.scss";
import {
  selectCurrentDetailStateByWorld,
  selectWorldArticlesByWorld,
} from "@/components/store/articlesSlice";
import { ArticlePieChart } from "./ArticlePieChart/articlePieChart";
import TagCloud from "./TagCloud/tagCloud";
import { ArticleWordPieChart } from "./ArticleWordPieChart/articleWordPieChart";
import { Tab, Tabs } from "react-bootstrap";
import { ArticleLengthPieChart } from "./ArticleLengthPieChart/articleLengthPieChart";

export function WorldStatistics() {
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );
  const articles = worldArticles!.articles;
  const isDetailed = currentDetailState.isFullDetail;

  let displayArticleWarning = articles.length > 1 ? false : true;

  const calculateTotalAndAverage = (arr: any[], property: string) => {
    const total = arr.reduce(
      (acc: any, item: { [x: string]: any }) =>
        item[property] ? acc + item[property] : acc,
      0
    );
    const average = arr.length > 0 ? total / arr.length : 0;
    const roundedAverage = average.toFixed(2);

    return { total, average: roundedAverage };
  };

  const { total: totalWordCount, average: averageWordCount } =
    calculateTotalAndAverage(articles, "wordcount");
  const { total: totalLikes, average: averageLikeCount } =
    calculateTotalAndAverage(articles, "likes");
  const { total: totalViews, average: averageViewCount } =
    calculateTotalAndAverage(articles, "views");

  return (
    <div className="world-statistics-container">
      <div className="world-stats">
        <h2>World Statistics</h2>
        <div className="row">
          <div className="col">
            <dt>Current World</dt>
            <dd>{world.title}</dd>
          </div>
          <div className="col">
            <dt>Followers</dt>
            <dd>{world.countFollowers}</dd>
          </div>
          <div className="col">
            <dt>Number of Articles</dt>
            <dd>{articles.length}</dd>
          </div>
          <div className="col">
            <dt>Number of Maps</dt>
            <dd>{world.countMaps}</dd>
          </div>
          <div className="col">
            <dt>Number of Timelines</dt>
            <dd>{world.countTimelines}</dd>
          </div>
        </div>
        <hr />
        {isDetailed && (
          <div className="advanced-stats">
            <h4>Detailed Statistics</h4>
            <div className="row">
              <div className="col">
                <dt>Total Wordcount</dt>
                <dd>{totalWordCount}</dd>
              </div>
              <div className="col">
                <dt>Average Wordcount</dt>
                <dd>{averageWordCount}</dd>
              </div>
              <div className="col">
                <dt>Total Likes</dt>
                <dd>{totalLikes}</dd>
              </div>
              <div className="col">
                <dt>Average Likes</dt>
                <dd>{averageLikeCount}</dd>
              </div>
              <div className="col">
                <dt>Total Views</dt>
                <dd>{totalViews}</dd>
              </div>
              <div className="col">
                <dt>Average Views</dt>
                <dd>{averageViewCount}</dd>
              </div>
            </div>
          </div>
        )}
        {!isDetailed && (
          <div className="article-warning">
            {
              "This section holds some stats that are only visible with Full Detail Mode turned on! Be sure to turn it on and Fetch All Articles to see this section!"
            }
          </div>
        )}
      </div>
      <hr />
      <div className="article-stats">
        <h2>Article Stats</h2>
        {displayArticleWarning && (
          <div className="article-warning">
            {
              "If you don't see anything here, be sure to fetch all your articles first from the API tool page!"
            }
          </div>
        )}
        {!displayArticleWarning && (
          <div>
            <Tabs>
              <Tab eventKey="numberRanked" title="By Number">
                <ArticlePieChart articles={articles}></ArticlePieChart>
              </Tab>
              <Tab
                eventKey="wordRanked"
                title="By Wordcount"
                disabled={!isDetailed}
              >
                <ArticleWordPieChart articles={articles}></ArticleWordPieChart>
              </Tab>
              <Tab
                eventKey="lengthRanked"
                title="By Length"
                disabled={!isDetailed}
              >
                <ArticleLengthPieChart
                  articles={articles}
                ></ArticleLengthPieChart>
              </Tab>
            </Tabs>
          </div>
        )}
        <hr />
        <h2>Tag Stats</h2>
        {!displayArticleWarning && <TagCloud></TagCloud>}
      </div>
    </div>
  );
}
