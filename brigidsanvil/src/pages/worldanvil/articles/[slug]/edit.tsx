import { selectIdentity, selectWorld } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { WorldAnvilEditor } from "@/components/ui/ArticleEdit/editor";
import {
  removeEditByID,
  selectCurrentArticles,
  selectEditState,
} from "@/components/store/articlesSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import CharacterEdit from "@/components/ui/ArticleEdit/EditComponents/character-edit";
import { Person } from "@/components/types/article-types/person";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";

import "./edit.scss";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  return {
    props: {},
  };
}

export default function EditPage() {
  const router = useRouter();
  const { slug } = router.query;

  const dispatch = useDispatch();

  const world = useSelector(selectWorld);
  const currentArticles = useSelector(selectCurrentArticles);

  const worldAnvilAPI = useWorldAnvilAPI();

  const article = currentArticles.find((article) => article.id === slug);

  const handleResetContent = () => {
    dispatch(removeEditByID({ worldID: world.id, articleID: article!.id }));
    router.reload();
  };

  const handleSaveContent = async () => {
    try {
      await worldAnvilAPI.updateEditedArticleByFields(article!.id);
      console.log("Article updated successfully");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="editpage">
      <Container>
        <Row>
          <Col>
            <div>
              <Button onClick={handleResetContent}>Reset Content</Button>
              <Button onClick={handleSaveContent}>Save to WorldAnvil</Button>
              <Link href={article!.url}>
                <Button>View on WorldAnvil</Button>
              </Link>
            </div>
            <CharacterEdit article={article as Person}></CharacterEdit>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
