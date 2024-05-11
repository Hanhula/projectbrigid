import { WorldAnvilEditor } from "@/components/ui/ArticleEdit/editor";
import Head from "next/head";
import { Container } from "react-bootstrap";

export default function EditTest() {
  return (
    <div>
      <Head>
        <title>Test Edit</title>
      </Head>
      <Container>
        <WorldAnvilEditor />
      </Container>
    </div>
  );
}
