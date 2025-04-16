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
import {
  Alert,
  Col,
  Container,
  ProgressBar,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
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
import { ArticleAuthorPieChart } from "./ArticleAuthorPieChart/articleAuthorPieChart";
import { ArticleAuthorTypePieChart } from "./ArticleAuthorTypePieChart/articleAuthorTypePieChart";
import { getFormattedDate } from "../Table/table-helpers";

const convertToDateString = (date: WorldAnvilDate) => {
  if (date && date.date) {
    const dateString = String(date.date);
    return getFormattedDate(dateString);
  } else {
    return "";
  }
};

export function WorldStatistics() {
  const world: World = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );
  const articles = worldArticles!.articles;
  const isDetailed = currentDetailState.isFullDetail;
  const currentDate = DateTime.now();

  let displayArticleWarning = articles.length > 1 ? false : true;

  const calculateArticleStats = (articles: Article[]) => {
    let publishedCount = 0;
    let draftCount = 0;
    let privateCount = 0;
    let publicCount = 0;
    let totalWordCount = 0;
    let totalLikes = 0;
    let totalViews = 0;
    let totalComments = 0;
    let activityCounts: { [monthYear: string]: number } = {};
    let fanCounts: { [title: string]: number } = {};
    let activeArticles = 0;
    let staleArticles = 0;
    let extraStaleArticles = 0;
    let articlesUpdatedThisMonth = 0;

    articles.forEach((article) => {
      if (article.isDraft) {
        draftCount++;
      } else {
        publishedCount++;
      }

      if (article.state === "private") {
        privateCount++;
      } else if (article.state === "public") {
        publicCount++;
      }

      totalWordCount += article.wordcount ? article.wordcount : 0;
      totalLikes += article.likes ? article.likes : 0;
      totalViews += article.views ? article.views : 0;
      totalComments += article.comments ? article.comments.length : 0;

      if (article.fans) {
        article.fans.forEach((fan: { title: string }) => {
          if (fanCounts[fan.title]) {
            fanCounts[fan.title]++;
          } else {
            fanCounts[fan.title] = 1;
          }
        });
      }

      if (article.updateDate) {
        const articleUpdateDateTime = DateTime.fromFormat(
          convertToDateString(article.updateDate),
          "yyyy-MM-dd 'at' HH:mm:ss"
        );
        const monthYear = articleUpdateDateTime.toFormat("yyyy-MM");
        activityCounts[monthYear] = (activityCounts[monthYear] || 0) + 1;

        if (currentDate.diff(articleUpdateDateTime, "months").months < 1) {
          articlesUpdatedThisMonth++;
        }

        if (
          currentDate.diff(articleUpdateDateTime, "months").months >= 1 &&
          currentDate.diff(articleUpdateDateTime, "months").months < 2
        ) {
          activeArticles++;
        }

        if (currentDate.diff(articleUpdateDateTime, "months").months > 6) {
          staleArticles++;
        }

        if (currentDate.diff(articleUpdateDateTime, "months").months > 12) {
          extraStaleArticles++;
        }
      }

      if (article.publicationDate) {
        const articlePublicationDateTime = DateTime.fromFormat(
          convertToDateString(article.publicationDate),
          "yyyy-MM-dd 'at' HH:mm:ss"
        );
        const monthYear = articlePublicationDateTime.toFormat("yyyy-MM");
        activityCounts[monthYear] = (activityCounts[monthYear] || 0) + 1;
      }
    });

    const averageWordCount =
      articles.length > 0 ? (totalWordCount / articles.length).toFixed(2) : 0;
    const averageLikes =
      articles.length > 0 ? (totalLikes / articles.length).toFixed(2) : 0;
    const averageViews =
      articles.length > 0 ? (totalViews / articles.length).toFixed(2) : 0;
    const averageComments =
      articles.length > 0 ? (totalComments / articles.length).toFixed(2) : 0;

    let mostActiveMonth = "";
    if (Object.keys(activityCounts).length !== 0) {
      mostActiveMonth = Object.keys(activityCounts).reduce((a, b) =>
        activityCounts[a] > activityCounts[b] ? a : b
      );
    } else {
      mostActiveMonth = "Unknown!";
    }

    const mostActiveMonthArticleCount = activityCounts[mostActiveMonth]
      ? activityCounts[mostActiveMonth]
      : "Unknown!";

    const topFans = Object.entries(fanCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      publishedCount,
      draftCount,
      privateCount,
      publicCount,
      totalWordCount,
      averageWordCount,
      totalLikes,
      averageLikes,
      totalViews,
      averageViews,
      totalComments,
      averageComments,
      topFans,
      mostActiveMonth,
      mostActiveMonthArticleCount,
      activeArticles,
      staleArticles,
      extraStaleArticles,
      articlesUpdatedThisMonth,
    };
  };

  const {
    publishedCount,
    draftCount,
    privateCount,
    publicCount,
    totalWordCount,
    averageWordCount,
    totalLikes,
    averageLikes,
    totalViews,
    averageViews,
    totalComments,
    averageComments,
    topFans,
    mostActiveMonth,
    mostActiveMonthArticleCount,
    activeArticles,
    staleArticles,
    extraStaleArticles,
    articlesUpdatedThisMonth,
  } = calculateArticleStats(articles);

  const creationDate = world.creationDate
    ? convertToDateString(world.creationDate)
    : "Update your world to see this date!";

  const progressPercentage = world.goalWords
    ? Math.round((totalWordCount / world.goalWords) * 100)
    : 0;

  let wordsPerMonth = 0;
  let publishedArticlesPerMonth: number | string = 0;
  if (world.creationDate) {
    const creationDateTime = DateTime.fromFormat(
      convertToDateString(world.creationDate),
      "yyyy-MM-dd 'at' HH:mm:ss"
    );
    const monthsDiff = Math.max(
      1,
      currentDate.diff(creationDateTime, "months").months
    );
    wordsPerMonth = Math.round(totalWordCount / monthsDiff);
    publishedArticlesPerMonth = (publishedCount / monthsDiff).toFixed(2);
  }

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
                    <dd>{averageLikes}</dd>
                  </div>
                </div>
                <Row>
                  <div className="col">
                    <dt>Total Views</dt>
                    <dd>{totalViews}</dd>
                  </div>
                  <div className="col">
                    <dt>Average Views</dt>
                    <dd>{averageViews}</dd>
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
                <Row>
                  <div className="col">
                    <dt>Published Articles</dt>
                    <dd>{publishedCount}</dd>
                  </div>
                  <div className="col">
                    <dt>Draft Articles</dt>
                    <dd>{draftCount}</dd>
                  </div>
                  <div className="col">
                    <dt>Public Articles</dt>
                    <dd>{publicCount}</dd>
                  </div>
                  <div className="col">
                    <dt>Private Articles</dt>
                    <dd>{privateCount}</dd>
                  </div>
                </Row>
                <Row>
                  <center>
                    <p>
                      {`These statistics are an average calculation based on the time between your world's creation and now!`}
                      <br></br>
                      {`Brigid only remembers your last update, so they may seem
                      off if you've updated a lot recently.`}
                    </p>
                  </center>
                </Row>
                <Row>
                  <div className="col">
                    <dt>Avg Words / Month</dt>
                    <dd>{wordsPerMonth}</dd>
                  </div>
                  <div className="col">
                    <dt>Avg Published Articles / Month</dt>
                    <dd>{publishedArticlesPerMonth}</dd>
                  </div>
                  <div className="col">
                    <dt>{`# Not Updated in > 6 Months`}</dt>
                    <dd>{staleArticles}</dd>
                  </div>
                  <div className="col">
                    <dt>{`# Not Updated in > 12 Months`}</dt>
                    <dd>{extraStaleArticles}</dd>
                  </div>
                </Row>
                <Row>
                  <div className="col">
                    <dt>Most Active Month (MAM)</dt>
                    <dd>{mostActiveMonth}</dd>
                  </div>
                  <div className="col">
                    <dt>Articles Changed in MAM</dt>
                    <dd>{mostActiveMonthArticleCount}</dd>
                  </div>
                  <div className="col">
                    <dt>{`# Updated Last Month`}</dt>
                    <dd>{activeArticles}</dd>
                  </div>
                  <div className="col">
                    <dt>{`# Updated This Month`}</dt>
                    <dd>{articlesUpdatedThisMonth}</dd>
                  </div>
                </Row>
              </Col>
            </Row>
            {world.goalWords && (
              <Row>
                <Col>
                  <Container className="progress-container">
                    <h5>Wordcount Progress</h5>
                    <ProgressBar
                      striped
                      variant="success"
                      max={world.goalWords}
                      now={totalWordCount}
                      label={`${progressPercentage}%`}
                    ></ProgressBar>
                    {totalWordCount > world.goalWords && (
                      <Alert variant="success">
                        {`Congratulations! You have exceeded your word goal by 
                        ${totalWordCount - world.goalWords} words!`}
                      </Alert>
                    )}
                  </Container>
                </Col>
              </Row>
            )}
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
              <Tab
                eventKey="authorName"
                title="By Author Name"
                disabled={!isDetailed}
              >
                <ArticleAuthorPieChart
                  articles={articles}
                ></ArticleAuthorPieChart>
              </Tab>
              <Tab
                eventKey="authorType"
                title="By Type Per Author"
                disabled={!isDetailed}
              >
                <ArticleAuthorTypePieChart
                  articles={articles}
                ></ArticleAuthorTypePieChart>
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
