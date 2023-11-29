import { Person } from "@/components/types/article-types/person";
import { WorldAnvilEditor } from "../editor";
import { Form, Tab, Tabs } from "react-bootstrap";
import { selectWorld } from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import DebouncedInput from "./debounced-input";

const CharacterEdit = ({ article }: { article: Person }) => {
  const world = useSelector(selectWorld);
  return (
    <div>
      <h1>{article.title}</h1>
      <Tabs defaultActiveKey="body" id="character-edit-tabs" className="mb-3">
        <Tab eventKey="body" title="Body">
          <WorldAnvilEditor
            fieldIdentifier="content"
            id={article.id}
            existingContent={article.content!}
          />
          <br />
          <h2>Physical Description</h2>
          <h3>General Physical Condition</h3>
          <WorldAnvilEditor
            fieldIdentifier="physique"
            id={article.id}
            existingContent={article.physique!}
          />
          <h3>Body Features</h3>
          <WorldAnvilEditor
            fieldIdentifier="bodyFeatures"
            id={article.id}
            existingContent={article.bodyFeatures!}
          />
          <br />
          <h3>Facial Features</h3>
          <WorldAnvilEditor
            fieldIdentifier="facialFeatures"
            id={article.id}
            existingContent={article.facialFeatures!}
          />
          <br />
          <h3>Identifying Characteristics</h3>
          <WorldAnvilEditor
            fieldIdentifier="Identifying Characteristics"
            id={article.id}
            existingContent={article.identifyingCharacteristics!}
          />
          <br />
          <h3>Physical Quirks</h3>
          <WorldAnvilEditor
            fieldIdentifier="physicalQuirks"
            id={article.id}
            existingContent={article.quirksPhysical!}
          />
        </Tab>
        <Tab eventKey="sidebar" title="Sidebar">
          <Form>
            <Form.Label>First Name</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"firstname"}
            />
          </Form>
        </Tab>
        <Tab eventKey="footer" title="Footer">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
};

export default CharacterEdit;
