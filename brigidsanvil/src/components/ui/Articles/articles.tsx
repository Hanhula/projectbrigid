import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectArticles,
  selectIsLoadingArticles,
  selectWorld,
} from "@/components/store/apiSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { Table } from "../Table/table";

const Articles = () => {
  const articles = useSelector(selectArticles);
  const isLoadingArticles = useSelector(selectIsLoadingArticles);
  const world = useSelector(selectWorld);
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
            worldAnvilAPI.getArticles(10, 0, 0, 10);
          }}
        >
          Fetch All Articles
        </Button>
        {isLoadingArticles && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <Button
          className="btn btn-primary"
          onClick={() => {
            worldAnvilAPI.getArticle(articles[0].id);
          }}
        >
          Fetch One
        </Button>
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
