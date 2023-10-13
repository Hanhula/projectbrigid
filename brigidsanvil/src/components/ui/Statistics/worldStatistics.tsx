import { selectWorld } from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import "./worldStatistics.scss";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { ArticlePieChart } from "./ArticlePieChart/articlePieChart";
import TagCloud from "./TagCloud/tagCloud";

export function WorldStatistics() {
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;

  let displayArticleWarning = articles.length > 1 ? false : true;

  // Create a map to store the count of each tag
  const tagCountMap: { [key: string]: number } = {};

  // Iterate through the articles and count the tags
  articles.forEach((article) => {
    if (article.tags) {
      // Check if article.tags exists and is not null/undefined
      const tags = article.tags.split(",");

      tags.forEach((tag) => {
        const trimmedTag = tag.trim(); // Remove leading/trailing spaces
        if (tagCountMap[trimmedTag]) {
          tagCountMap[trimmedTag] += 1;
        } else {
          tagCountMap[trimmedTag] = 1;
        }
      });
    }
  });

  // Sort the tag counts in descending order
  const sortedTags = Object.entries(tagCountMap).sort((a, b) => b[1] - a[1]);

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
        {!displayArticleWarning && <ArticlePieChart></ArticlePieChart>}
        <hr />
        <TagCloud></TagCloud>
      </div>
    </div>
  );
}
