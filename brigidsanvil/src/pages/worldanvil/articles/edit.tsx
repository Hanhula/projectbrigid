import { selectIdentity, selectWorld } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import "./edit.scss";
import { WorldAnvilEditor } from "@/components/ui/ArticleEdit/editor";
import {
  removeEditByID,
  selectCurrentArticles,
} from "@/components/store/articlesSlice";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import CharacterEdit from "@/components/ui/ArticleEdit/EditComponents/character-edit";
import { Person } from "@/components/types/article-types/person";

export default function EditPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  const world = useSelector(selectWorld);
  const currentArticles = useSelector(selectCurrentArticles);

  const article = currentArticles[39];
  console.log(article);

  const handleResetContent = () => {
    dispatch(removeEditByID({ worldId: world.id, articleID: article!.id }));
    router.reload();
  };

  return (
    <div>
      <div>
        <Button onClick={handleResetContent}>Reset Content</Button>
      </div>
      <h3>Content</h3>
      {/* <WorldAnvilEditor
        fieldIdentifier="content"
        id={article!.id}
        existingContent={article!.content!}
      ></WorldAnvilEditor> */}
      <CharacterEdit article={article as Person}></CharacterEdit>
    </div>
  );
}
