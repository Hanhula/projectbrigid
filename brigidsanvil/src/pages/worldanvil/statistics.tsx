import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import { WorldStatistics } from "@/components/ui/Statistics/worldStatistics";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

export default function Statistics() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  return (
    <Container className="py-4 statistics-page">
      <Head>
        <title>Statistics</title>
      </Head>
      <Row>
        <Col>
          {authToken && identity.success && (
            <Container>
              <h1
                className="text-center"
                style={{ marginTop: "0.3em", padding: "0.2em" }}
              >
                Statistics
              </h1>
              <WorldStatistics />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}
