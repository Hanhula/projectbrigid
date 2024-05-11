import { Person } from "@/components/types/article-types/person";
import { WorldAnvilEditor } from "../editor";
import { Form, Tab, Tabs } from "react-bootstrap";
import { selectWorld } from "@/components/store/apiSlice";
import { useSelector } from "react-redux";
import DebouncedInput from "./debounced-input";
import DebouncedDropdown from "./debounced-dropdown";
import { useState } from "react";

const CharacterEdit = ({ article }: { article: Person }) => {
  const world = useSelector(selectWorld);

  const renderEditor = (fieldIdentifier: string, title?: string) => (
    <>
      {title && <h3>{title}</h3>}
      <WorldAnvilEditor content={article[fieldIdentifier]!} />
      <br />
    </>
  );

  return (
    <div>
      <h1>{article.title}</h1>
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
                "Identifying Characteristics"
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
                "Intellectual Characteristics"
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
