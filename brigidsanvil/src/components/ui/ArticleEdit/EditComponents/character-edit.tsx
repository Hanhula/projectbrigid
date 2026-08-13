import { Person } from "@/components/types/article-types/person";
import { WorldAnvilEditor } from "../editor";
import { Button, ButtonGroup, Form, Tab, Tabs } from "react-bootstrap";
import { selectWorld } from "@/components/store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import DebouncedInput from "./debounced-input";
import DebouncedDropdown from "./debounced-dropdown";
import { useCallback, useState } from "react";
import {
  selectEditorMode,
  setEditorMode,
} from "@/components/store/articlesSlice";

const CharacterEdit = ({ article }: { article: Person }) => {
  const dispatch = useDispatch();
  const world = useSelector(selectWorld);
  const editorMode = useSelector(selectEditorMode);
  const [lastFocusedEditor, setLastFocusedEditor] = useState("");
  const [isSwitchingMode, setIsSwitchingMode] = useState(false);

  const switchEditorMode = useCallback(
    (mode: "rich" | "raw") => {
      if (mode === editorMode || isSwitchingMode) {
        return;
      }

      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }

      setLastFocusedEditor("");
      setIsSwitchingMode(true);

      // Two-phase switch avoids Slate unmount/remount in the same commit.
      setTimeout(() => {
        dispatch(setEditorMode(mode));
        requestAnimationFrame(() => {
          setIsSwitchingMode(false);
        });
      }, 0);
    },
    [dispatch, editorMode, isSwitchingMode],
  );

  const renderEditor = (fieldIdentifier: string, title?: string) => (
    <>
      {title && <h3>{title}</h3>}
      {!isSwitchingMode ? (
        <WorldAnvilEditor
          fieldIdentifier={fieldIdentifier}
          id={article.id}
          existingContent={article[fieldIdentifier]!}
          onFocus={setLastFocusedEditor}
          lastFocusedEditor={lastFocusedEditor}
        />
      ) : (
        <div className="text-muted">Switching editor mode...</div>
      )}
      <br />
    </>
  );

  return (
    <div>
      <h1>{article.title}</h1>
      <div className="d-flex align-items-center gap-2 mb-3">
        <strong>Editor Mode</strong>
        <ButtonGroup aria-label="Editor mode toggle">
          <Button
            size="sm"
            variant={editorMode === "rich" ? "primary" : "outline-primary"}
            onClick={() => switchEditorMode("rich")}
            disabled={isSwitchingMode}
          >
            Rich
          </Button>
          <Button
            size="sm"
            variant={editorMode === "raw" ? "primary" : "outline-primary"}
            onClick={() => switchEditorMode("raw")}
            disabled={isSwitchingMode}
          >
            Raw BBCode
          </Button>
        </ButtonGroup>
        <small className="text-muted">
          Shift+Enter inserts a soft line break in Rich mode.
        </small>
      </div>
      <Tabs defaultActiveKey="body" id="character-edit-tabs" className="mb-3">
        <Tab eventKey="body" title="Body">
          {renderEditor("content")}
          <Tabs
            defaultActiveKey="physDesc"
            id="character-sub-tabs"
            className="mb-3"
          >
            <Tab eventKey="divine" title="Divine Characteristics">
              {renderEditor("domains", "Divine Domains")}
              {renderEditor("artifacts", "Artifacts")}
              {renderEditor("codes", "Holy Books & Codes")}
              {renderEditor("holysymbols", "Divine Symbols & Sigils")}
              {renderEditor("tenets", "Tenets of Faith")}
              {renderEditor("holidays", "Holidays")}
              {renderEditor("goals", "Divine Goals & Aspirations")}
            </Tab>
            <Tab eventKey="physDesc" title="Physical Description">
              {renderEditor("physique", "General Physical Condition")}
              {renderEditor("bodyFeatures", "Body Features")}
              {renderEditor("facialFeatures", "Facial Features")}
              {renderEditor(
                "identifyingCharacteristics",
                "Identifying Characteristics",
              )}
              {renderEditor("quirksPhysical", "Physical Quirks")}
              {renderEditor("specialAbilities", "Special Abilities")}
              {renderEditor("clothing", "Apparel & Accessories")}
              {renderEditor("items", "Specialised Equipment")}
            </Tab>
            <Tab eventKey="mentalChara" title="Mental Characteristics">
              {renderEditor("history", "Personal History")}
              {renderEditor("genderidentity", "Gender Identity")}
              {renderEditor("sexuality", "Sexuality")}
              {renderEditor("education", "Education")}
              {renderEditor("employment", "Employment")}
              {renderEditor("achievements", "Accomplishments & Achievements")}
              {renderEditor("failures", "Failures & Embarrassments")}
              {renderEditor("mentalTraumas", "Mental Trauma")}
              {renderEditor(
                "intellectualCharacteristics",
                "Intellectual Characteristics",
              )}
              {renderEditor("morality", "Morality & Philosophy")}
              {renderEditor("taboos", "Taboos")}
            </Tab>
            <Tab eventKey="personChara" title="Personality Characteristics">
              {renderEditor("motivation", "Motivation")}
              {renderEditor("savviesIneptitudes", "Savvies & Ineptitudes")}
              {renderEditor("likesDislikes", "Likes & Dislikes")}
              {renderEditor("virtues", "Virtues & Personality Perks")}
              {renderEditor("vices", "Vices & Personality Flaws")}
              {renderEditor("quirksPersonality", "Personality Quirks")}
              {renderEditor("hygiene", "Hygiene")}
            </Tab>
            <Tab eventKey="socialChara" title="Social">
              {renderEditor("reign", "Reign")}
              {renderEditor("relations", "Contacts & Relations")}
              {renderEditor("family", "Family Ties")}
              {renderEditor("religion", "Religious Views")}
              {renderEditor("socialAptitude", "Social Aptitude")}
              {renderEditor("mannerisms", "Mannerisms")}
              {renderEditor("hobbies", "Hobbies & Pets")}
              {renderEditor("speech", "Speech")}
              {renderEditor("wealth", "Wealth & Financial State")}
            </Tab>
          </Tabs>
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
          {article.religions && (
            <Form>
              <Form.Label>Religions</Form.Label>
              <div>
                {
                  "This field is added by the Organisation template's Deities field. It must be set there!"
                }
              </div>
            </Form>
          )}
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
              fieldIdentifier={"vehicle"}
              entityClass={["Vehicle"]}
            />
          </Form>
          <Form>
            <Form.Label>Species</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"species"}
              entityClass={["Species"]}
            />
          </Form>
          <Form>
            <Form.Label>Conditions</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"conditions"}
              entityClass={["Condition"]}
              isMulti={true}
            />
          </Form>
          <Form>
            <Form.Label>Ethnicity</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"ethnicity"}
              entityClass={["Ethnicity"]}
            />
          </Form>
          <Form>
            <Form.Label>Other Ethnicities/Cultures</Form.Label>
            <DebouncedDropdown
              world={world}
              article={article}
              fieldIdentifier={"otherethnicities"}
              entityClass={["Ethnicity"]}
              isMulti={true}
            />
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
