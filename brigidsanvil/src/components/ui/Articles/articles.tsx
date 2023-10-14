import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingArticles,
  selectWorld,
} from "@/components/store/apiSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { ArticleTable } from "../Table/table";
import {
  selectCurrentDetailStateByWorld,
  selectWorldArticlesByWorld,
  setDetailState,
} from "@/components/store/articlesSlice";

const Articles = () => {
  const isLoadingArticles = useSelector(selectIsLoadingArticles);
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const worldAnvilAPI = useWorldAnvilAPI();
  const dispatch = useDispatch();
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );

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

  const setDetailLevel = (checked: boolean) => {
    dispatch(setDetailState({ world: world, isFullDetail: checked }));
  };

  const stubs = stubMurder();
  const drafts = DRAFTY();

  const articleCount = world.countArticles;
  const minutes = Math.floor(articleCount / 60);
  const seconds = articleCount % 60;

  return (
    <div className="table-container">
      <div className="button-container">
        <Button
          className="btn btn-primary"
          onClick={() => {
            worldAnvilAPI.getArticles(
              Math.min(articleCount, 50),
              0,
              0,
              articleCount
            );
          }}
        >
          Fetch All Articles
        </Button>
        {isLoadingArticles && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Request full detail?"
            checked={currentDetailState.isFullDetail}
            onChange={(e) => setDetailLevel(e.target.checked)}
          />
          <Form.Text>{`Please note that this tool takes approximately 1 second per article to retrieve your world's articles at full detail. As you have ${articleCount} articles, please expect full detail mode to take ${minutes} minutes and ${seconds} seconds for its first-time load. Subsequent responses will be much faster, as they'll only update if you've changed something on WA! Timer functionality for this has not yet been implemented, sorry!`}</Form.Text>
        </Form>
      </div>
      <ArticleTable data={articles} getRowCanExpand={() => true} />
      <div>
        {stubs + " stubs DONE"}
        <br />
        {drafts + " drafts REMAINING"}
      </div>
    </div>
  );
};

export default Articles;
