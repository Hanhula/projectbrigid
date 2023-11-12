import React from "react";
import { useSelector } from "react-redux";
import { selectIdentity } from "@/components/store/apiSlice";

import "./apitool.scss";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./quicklinks.scss";
import { faBook, faImage, faList } from "@fortawesome/free-solid-svg-icons";

const APITool = () => {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  return (
    <div className="container quicklinks">
      <Head>
        <title>Articles Explorer</title>
      </Head>
      {authToken && identity.success && (
        <div className="row">
          <div className="col">
            <br />
            <h1>WorldAnvil Quick Links</h1>
            <h2>Create Articles</h2>
            <br />
            <Container>
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/article/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-book"> </span>
                        <Card.Title>Generic Article</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/person/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-player"> </span>
                        <Card.Title>Character</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/condition/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-biohazard"> </span>
                        <Card.Title>Condition</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/militaryConflict/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-dripping-sword"> </span>
                        <Card.Title>Conflict</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/document/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-scroll-unfurled"> </span>
                        <Card.Title>Document</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/ethnicity/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-footprint"> </span>
                        <Card.Title>Ethnicity</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/location/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-mountains"> </span>
                        <Card.Title>Geography</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/item/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-sword"> </span>
                        <Card.Title>Item</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/landmark/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-pyramids"> </span>
                        <Card.Title>Landmark</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/language/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-wooden-sign"> </span>
                        <Card.Title>Language</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/material/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-gold-bar"> </span>
                        <Card.Title>Material</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/formation/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-lightning-sword"> </span>
                        <Card.Title>Military Unit</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/myth/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-hydra"> </span>
                        <Card.Title>Myth</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/law/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-lightning"> </span>
                        <Card.Title>{"Natural Law"}</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/organization/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-cog"> </span>
                        <Card.Title>Organisation</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/plot/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-meat-hook"> </span>
                        <Card.Title>Plot</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/profession/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-gear-hammer"> </span>
                        <Card.Title>Profession</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/prose/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-rune-stone"> </span>
                        <Card.Title>Prose</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/rank/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-crown"> </span>
                        <Card.Title>Rank / Title</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>

                <Col>
                  <a href="https://www.worldanvil.com/world/settlement/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-capitol"> </span>
                        <Card.Title>Settlement</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/species/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-fish"> </span>
                        <Card.Title>Species</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/spell/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-fairy-wand"> </span>
                        <Card.Title>Spell</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/technology/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-vial"> </span>
                        <Card.Title>Technology</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/ritual/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-two-hearts"> </span>
                        <Card.Title>Tradition</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/vehicle/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-horseshoe"> </span>
                        <Card.Title>Vehicle</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/report/new">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-burning-book"> </span>
                        <Card.Title>Session Report</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
              <h2>Find Pages</h2>
              <br />
              <Row>
                <Col>
                  <a href="https://www.worldanvil.com/world/apollo/">
                    <Card>
                      <Card.Body>
                        <FontAwesomeIcon
                          icon={faImage}
                          size="3x"
                        ></FontAwesomeIcon>
                        <Card.Title>Images</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/manuscript/list">
                    <Card>
                      <Card.Body>
                        <FontAwesomeIcon
                          icon={faBook}
                          size="3x"
                        ></FontAwesomeIcon>
                        <Card.Title>Manuscripts</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/map/list">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-compass"> </span>
                        <Card.Title>Maps</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/timeline/list">
                    <Card>
                      <Card.Body>
                        <span className="ra ra-3x ra-hourglass"> </span>
                        <Card.Title>Timelines</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
                <Col>
                  <a href="https://www.worldanvil.com/world/variables/">
                    <Card>
                      <Card.Body>
                        <FontAwesomeIcon
                          icon={faList}
                          size="3x"
                        ></FontAwesomeIcon>
                        <Card.Title>Variables</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
              <br />
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default APITool;
