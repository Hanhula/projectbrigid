import { selectIdentity, selectWorld } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useSelector } from "react-redux";
import "./quickcreate.scss";
import { ArticleQuickCreate } from "@/components/ui/ArticleQuickCreate/article-quick-create";
import { Container } from "react-bootstrap";

export default function QuickCreate() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const world = useSelector(selectWorld);

  return (
    <div>
      <Head>
        <title>Quick Create</title>
      </Head>
      {authToken && identity.success && world.id && (
        <ArticleQuickCreate></ArticleQuickCreate>
      )}
      {!authToken ||
        !identity.success ||
        (!world.id && (
          <Container>
            <h1
              className="text-center"
              style={{ marginTop: "0.3em", padding: "0.2em" }}
            >
              Quick Create
            </h1>
            <p className="text-center">
              You must be logged in and have a world selected to use this
              feature.
            </p>
          </Container>
        ))}
    </div>
  );
}
