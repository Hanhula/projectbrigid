import { Button, Form, ProgressBar, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  resetArticleFetchProgress,
  selectArticleFetchProgress,
  selectIsLoadingArticles,
  selectWorld,
  setLoadingArticles,
} from "@/components/store/apiSlice";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { ArticleTable } from "../Table/table";
import * as articleSliceSelectors from "@/components/store/articlesSlice";
import { useAppSelector } from "@/components/store/store";

const Articles = () => {
  const isLoadingArticles = useAppSelector(selectIsLoadingArticles);
  const articleFetchProgress = useAppSelector(selectArticleFetchProgress);
  const world = useAppSelector(selectWorld);
  const worldArticles = useAppSelector(
    articleSliceSelectors.selectWorldArticlesByWorld(world.id),
  );
  const articles = worldArticles!.articles;
  const worldAnvilAPI = useWorldAnvilAPI();
  const dispatch = useDispatch();
  const currentDetailState = useAppSelector(
    articleSliceSelectors.selectCurrentDetailStateByWorld(world.id),
  );
  const { stubCount, draftCount } = useAppSelector((state) =>
    articleSliceSelectors.selectWorldArticleStats(state, world.id),
  );

  const setDetailLevel = (checked: boolean) => {
    dispatch(resetArticleFetchProgress());
    dispatch(setLoadingArticles(false));
    dispatch(
      articleSliceSelectors.setDetailState({
        world: world,
        isFullDetail: checked,
      }),
    );
  };

  const articleCount = world.countArticles;
  const minutes = Math.floor(articleCount / 60);
  const seconds = articleCount % 60;
  const progressPercentage =
    articleFetchProgress.totalCount > 0
      ? Math.round(
          (articleFetchProgress.loadedCount / articleFetchProgress.totalCount) *
            100,
        )
      : 0;
  const shouldShowProgress =
    Boolean(articleFetchProgress.worldId === world.id) &&
    (isLoadingArticles ||
      articleFetchProgress.isComplete ||
      articleFetchProgress.loadedCount > 0 ||
      articleFetchProgress.totalCount > 0);

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
              articleCount,
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
        {shouldShowProgress && articleCount > 0 && (
          <div
            className="d-flex align-items-center"
            style={{
              minHeight: isLoadingArticles ? "auto" : "1.5rem",
              width: isLoadingArticles ? "100%" : "auto",
              flexWrap: "wrap",
              paddingRight: isLoadingArticles ? "0.5rem" : "0",
            }}
          >
            {isLoadingArticles ? (
              <>
                <div style={{ width: "100%" }}>
                  <ProgressBar
                    now={progressPercentage}
                    label={`${progressPercentage}%`}
                    striped
                    animated
                  />
                </div>
                <Form.Text className="mt-2">
                  {`Fetched ${articleFetchProgress.loadedCount} of ${articleFetchProgress.totalCount} steps`}
                </Form.Text>
              </>
            ) : (
              <Form.Text className="text-success fw-semibold mb-0 d-block p-2">
                {`Fetch complete: ${articleFetchProgress.loadedCount} of ${articleFetchProgress.totalCount} steps loaded`}
              </Form.Text>
            )}
          </div>
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
        {stubCount + " stubs DONE"}
        <br />
        {draftCount + " drafts REMAINING"}
      </div>
    </div>
  );
};

export default Articles;
