import { selectWorld } from "@/components/store/apiSlice";
import { selectCurrentArticles } from "@/components/store/articlesSlice";
import Link from "next/link";
import Head from "next/head";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function LocalDrafts() {
  const world = useSelector(selectWorld);
  const localDrafts = useSelector(selectCurrentArticles).filter(
    (article) => article.isLocalDraft,
  );

  return (
    <>
      <Head>
        <title>Local Drafts | Brigid&apos;s Anvil</title>
      </Head>
      <Container className="py-4">
        <h1>Local Drafts</h1>
        <p className="text-muted">
          These articles are stored locally and have not been saved to World
          Anvil! Open one to continue editing, export it, or save it to World
          Anvil. Note that these will only persist as long as the browser data
          does - if it gets wiped, these will be lost!
        </p>
        {localDrafts.length === 0 ? (
          <p>No local drafts for {world.title || "the current world"}.</p>
        ) : (
          <Row xs={1} md={2} className="g-3">
            {localDrafts.map((article) => (
              <Col key={article.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {article.title || "Untitled article"}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {article.entityClass}
                    </Card.Text>
                    <Link
                      className="btn btn-primary"
                      href={`/worldanvil/articles/${article.id}/edit`}
                    >
                      Open editor
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
