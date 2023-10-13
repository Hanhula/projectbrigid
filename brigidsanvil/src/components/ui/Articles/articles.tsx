import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectIsLoadingArticles,
  selectWorld,
} from "@/components/store/apiSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { Table } from "../Table/table";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";

const Articles = () => {
  const isLoadingArticles = useSelector(selectIsLoadingArticles);
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const worldAnvilAPI = useWorldAnvilAPI();

  const stubMurder = () => {
    let stubmurder = articles.filter((article) => {
      if (article.tags) {
        return article.tags.includes("stub");
      }
      return false;
    });
    return stubmurder.length;
  };

  const DRAFTY = () => {
    let draaaaaaaft = articles.filter((article) => {
      return article.isDraft;
    });
    return draaaaaaaft.length;
  };

  const stubs = stubMurder();
  const drafts = DRAFTY();

  return (
    <div className="table-container">
      <div className="button-container">
        <Button
          className="btn btn-primary"
          onClick={() => {
            worldAnvilAPI.getArticles(50, 0, 0, world.countArticles);
          }}
        >
          Fetch All Articles
        </Button>
        {isLoadingArticles && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {/* <Button
          className="btn btn-primary"
          onClick={() => {
            worldAnvilAPI.getArticle(articles[0].id);
          }}
        >
          Fetch One
        </Button> */}
      </div>
      <Table data={articles} getRowCanExpand={() => true} />
      <div>
        {stubs + " stubs DONE"}
        <br />
        {drafts + " drafts REMAINING"}
      </div>
    </div>
  );
};

export default Articles;
