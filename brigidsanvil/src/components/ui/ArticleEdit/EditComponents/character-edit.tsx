import { Person } from "@/components/types/article-types/person";
import { WorldAnvilEditor } from "../editor";
import { Form, Tab, Tabs } from "react-bootstrap";
import { selectWorld } from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import DebouncedInput from "./debounced-input";
import DebouncedDropdown from "./debounced-dropdown";

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
            fieldIdentifier="identifyingCharacteristics"
            id={article.id}
            existingContent={article.identifyingCharacteristics!}
          />
          <br />
          <h3>Physical Quirks</h3>
          <WorldAnvilEditor
            fieldIdentifier="quirksPhysical"
            id={article.id}
            existingContent={article.quirksPhysical!}
          />
          <br />
          <h3>Special Abilities</h3>
          <WorldAnvilEditor
            fieldIdentifier="specialAbilities"
            id={article.id}
            existingContent={article.specialAbilities!}
          />
          <br />
          <h3>Apparel & Accessories</h3>
          <WorldAnvilEditor
            fieldIdentifier="clothing"
            id={article.id}
            existingContent={article.clothing!}
          />
          <br />
          <h3>Specialised Equipment</h3>
          <WorldAnvilEditor
            fieldIdentifier="items"
            id={article.id}
            existingContent={article.items!}
          />
          <h2>Mental Characteristics</h2>
          <h3>Personal History</h3>
          <WorldAnvilEditor
            fieldIdentifier="history"
            id={article.id}
            existingContent={article.history!}
          />
        </Tab>
        <Tab eventKey="subtitle" title="Subtitle">
          <Form>
            <Form.Label>Honorific / Title</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"honorific"}
            />
          </Form>
          <Form>
            <Form.Label>First Name</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"firstname"}
            />
          </Form>
          <Form>
            <Form.Label>Middle Name</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"middlename"}
            />
          </Form>
          <Form>
            <Form.Label>Last Name</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"lastname"}
            />
          </Form>
          <Form>
            <Form.Label>Maiden Name</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"maidenname"}
            />
          </Form>
          <Form>
            <Form.Label>Suffix</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"suffix"}
            />
          </Form>
          <Form>
            <Form.Label>Nickname / Alias</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"nickname"}
            />
          </Form>
        </Tab>
        <Tab eventKey="sidebar" title="Sidebar">
          <Form>
            <Form.Label>Divine Classification</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"classification"}
            />
          </Form>
          <Form>
            <Form.Label>Religions</Form.Label>
          </Form>
          <Form>
            <Form.Label>Alignment</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"rpgAlignment"}
            />
          </Form>
          <Form>
            <Form.Label>Current Status</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"currentstatus"}
            />
          </Form>
          <Form>
            <Form.Label>Current Location</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"currentLocation"}
              entityClass={["Settlement", "Landmark", "Building"]}
            />
          </Form>
          <Form>
            <Form.Label>Currently Boarded Vehicle</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"currentLocation"}
              entityClass={["Vehicle"]}
            />
          </Form>
          <Form>
            <Form.Label>Species</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"currentLocation"}
              entityClass={["Species"]}
            />
          </Form>
          <Form>
            <Form.Label>Conditions</Form.Label>
          </Form>
          <Form>
            <Form.Label>Ethnicity</Form.Label>
          </Form>
          <Form>
            <Form.Label>Other Ethnicities/Cultures</Form.Label>
          </Form>
          <Form>
            <Form.Label>Realm</Form.Label>
          </Form>
          <Form>
            <Form.Label>Church/Cult</Form.Label>
          </Form>
          <Form>
            <Form.Label>Honorary & Occupational Titles</Form.Label>
            <DebouncedInput
              world={world}
              article={article}
              fieldIdentifier={"????"}
            />
          </Form>
          <Form>
            <Form.Label>Professions</Form.Label>
          </Form>
          <Form>
            <Form.Label>Currently Held Titles</Form.Label>
          </Form>
          <Form>
            <Form.Label>Previously Held Ranks & Titles</Form.Label>
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
