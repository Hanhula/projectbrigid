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
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { ArticleLengthPieChart } from "./ArticleLengthPieChart/articleLengthPieChart";
import { ArticleCreationDatePieChart } from "./ArticleCreationDatePieChart/articleCreationDatePieChart";
import { ArticleUpdateDatePieChart } from "./ArticleUpdateDatePieChart/articleUpdateDatePieChart";
import { ArticlePublicationDatePieChart } from "./ArticlePublicationDatePieChart/articlePublicationDatePieChart";
import { ArticleLikesPieChart } from "./ArticleLikesPieChart/articleLikesPieChart";
import { ArticleViewsPieChart } from "./ArticleViewsPieChart/articleViewsPieChart";
import { Article } from "@/components/types/article";
import { World } from "@/components/types/world";
import { WorldAnvilDate } from "@/components/types/date";
import { DateTime } from "luxon";

export function WorldStatistics() {
  const world: World = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );
  const articles = worldArticles!.articles;
  const isDetailed = currentDetailState.isFullDetail;

  let displayArticleWarning = articles.length > 1 ? false : true;

  const calculateTotalAndAverage = (arr: Article[], property: string) => {
    const total = arr.reduce(
      (acc: any, item: { [x: string]: any }) =>
        item[property] ? acc + item[property] : acc,
      0
    );
    const average = arr.length > 0 ? total / arr.length : 0;
    const roundedAverage = average.toFixed(2);

    return { total, average: roundedAverage };
  };

  const calculateTopFans = (articles: Article[]) => {
    const fanCounts: { [title: string]: number } = {};

    articles.forEach((article) => {
      if (article.fans) {
        article.fans.forEach((fan: { title: string }) => {
          if (fanCounts[fan.title]) {
            fanCounts[fan.title]++;
          } else {
            fanCounts[fan.title] = 1;
          }
        });
      }
    });

    // Step 2: Convert to array, sort and take top 10
    const topFans = Object.entries(fanCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return topFans;
  };

  const calculateTotalAndAverageComments = (articles: any[]) => {
    let totalComments = 0;

    articles.forEach((article) => {
      if (article.comments) {
        totalComments += article.comments.length;
      }
    });

    const averageComments =
      articles.length > 0 ? (totalComments / articles.length).toFixed(2) : 0;

    return { totalComments, averageComments };
  };

  const convertToDateString = (date: WorldAnvilDate) => {
    const dateString = String(date.date);
    const inputDateString = dateString.substring(0, dateString.length - 7);
    const dateTime = DateTime.fromFormat(
      inputDateString,
      "yyyy-MM-dd HH:mm:ss",
      { zone: "utc" }
    );
    const localDateTime = dateTime.toLocal();
    const formattedDateTime = localDateTime.toFormat(
      "yyyy-MM-dd 'at' HH:mm:ss"
    );
    return formattedDateTime;
  };

  const { total: totalWordCount, average: averageWordCount } =
    calculateTotalAndAverage(articles, "wordcount");
  const { total: totalLikes, average: averageLikeCount } =
    calculateTotalAndAverage(articles, "likes");
  const { total: totalViews, average: averageViewCount } =
    calculateTotalAndAverage(articles, "views");

  const topFans = calculateTopFans(articles);
  const { totalComments, averageComments } =
    calculateTotalAndAverageComments(articles);

  const creationDate = world.creationDate
    ? convertToDateString(world.creationDate)
    : "Update your world to see this date!";

  return (
    <div className="world-statistics-container">
      <div className="world-stats">
        <h2>World Statistics</h2>
        <Row>
          <Col>
            <dt>Current World</dt>
            <dd>{world.title}</dd>
          </Col>
          <Col>
            <dt>Followers</dt>
            <dd>{world.countFollowers}</dd>
          </Col>
          <Col>
            <dt>World Creation Date</dt>
            <dd>{creationDate}</dd>
          </Col>
          <Col>
            <dt>Word Goal</dt>
            <dd>{world.goalWords}</dd>
          </Col>
        </Row>
        <Row>
          <Col>
            <dt>World Views</dt>
            <dd>{world.views}</dd>
          </Col>
          <Col>
            <dt>Number of Articles</dt>
            <dd>{articles.length}</dd>
          </Col>
          <Col>
            <dt>Number of Maps</dt>
            <dd>{world.countMaps}</dd>
          </Col>
          <Col>
            <dt>Number of Timelines</dt>
            <dd>{world.countTimelines}</dd>
          </Col>
        </Row>
        <hr />
        {isDetailed && (
          <div className="advanced-stats">
            <h4>Detailed Statistics</h4>
            <Row>
              <Col md={2}>
                <h4>Top 10 Fans</h4>
                <ol>
                  {topFans.map((fan, index) => (
                    <li key={index}>
                      {fan[0]}: {fan[1]}
                    </li>
                  ))}
                </ol>
              </Col>
              <Col>
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
                </div>
                <Row>
                  <div className="col">
                    <dt>Total Views</dt>
                    <dd>{totalViews}</dd>
                  </div>
                  <div className="col">
                    <dt>Average Views</dt>
                    <dd>{averageViewCount}</dd>
                  </div>
                  <div className="col">
                    <dt>Total Comments</dt>
                    <dd>{totalComments}</dd>
                  </div>
                  <div className="col">
                    <dt>Average Comments</dt>
                    <dd>{averageComments}</dd>
                  </div>
                </Row>
              </Col>
            </Row>
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
              <Tab
                eventKey="createDateRanked"
                title="By Creation Date"
                disabled={!isDetailed}
              >
                <ArticleCreationDatePieChart
                  articles={articles}
                ></ArticleCreationDatePieChart>
              </Tab>
              <Tab
                eventKey="updateDateRanked"
                title="By Update Date"
                disabled={!isDetailed}
              >
                <ArticleUpdateDatePieChart
                  articles={articles}
                ></ArticleUpdateDatePieChart>
              </Tab>
              <Tab
                eventKey="publishDateRanked"
                title="By Publication Date"
                disabled={!isDetailed}
              >
                <ArticlePublicationDatePieChart
                  articles={articles}
                ></ArticlePublicationDatePieChart>
              </Tab>
              <Tab
                eventKey="likesTypeRanked"
                title="By Likes per Type"
                disabled={!isDetailed}
              >
                <ArticleLikesPieChart
                  articles={articles}
                ></ArticleLikesPieChart>
              </Tab>
              <Tab
                eventKey="viewsTypeRanked"
                title="By Views per Type"
                disabled={!isDetailed}
              >
                <ArticleViewsPieChart
                  articles={articles}
                ></ArticleViewsPieChart>
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
