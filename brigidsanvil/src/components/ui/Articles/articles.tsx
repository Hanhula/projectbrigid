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
import CSVGenerator from "../CSVGenerator/csvgenerator";

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
      <div className="button-container top-button-container">
        <Button
          variant="primary"
          className="fetch-button"
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
        </Form>
      </div>
      <Form.Text>{`Please note that this tool takes approximately 1 second per article to retrieve your world's articles at full detail. As you have ${articleCount} articles, please expect full detail mode to take ${minutes} minutes and ${seconds} seconds for its first-time load. Subsequent responses will be much faster, as they'll only update if you've changed something on WA! Timer functionality for this has not yet been implemented, sorry!`}</Form.Text>
      <div>
        <h3>Important Note on Editing</h3>
        <div>
          {
            "Edited articles won't be updated prior to being edited. If you're going to edit fields in this tool and you may have edited them elsewhere, FETCH FIRST, or those changes will be overwritten. That being said, the tool also only updates the one field you choose to edit!"
          }
        </div>
      </div>

      <div
        className={
          currentDetailState.isFullDetail
            ? "table-tool full-detail-table"
            : "table-tool min-detail-table"
        }
      >
        <ArticleTable data={articles} getRowCanExpand={() => true} />
      </div>
      <div>
        <h4>{"Han's Utility Bits"}</h4>
        <p>
          This stuff's just for me to track how my progress is going with the
          stub murder. It displays how many articles include the word 'stub' in
          their tags, and how many drafts the world has. For full stats, check
          the stats page!
        </p>
        {stubs + " stubs DONE"}
        <br />
        {drafts + " drafts REMAINING"}
      </div>
    </div>
  );
};

export default Articles;
