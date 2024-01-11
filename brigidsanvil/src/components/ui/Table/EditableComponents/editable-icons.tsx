import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Modal,
  OverlayTrigger,
  Pagination,
  Row,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "react-bootstrap";
import {
  IconName,
  faCheck,
  faSearch,
  faXmark,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  IconProp,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { Tab, Tabs } from "react-bootstrap";

import "./editable-icons.scss";
import { rpgAwesomeIcons } from "./rpgawesome-icons";
import { useMediaQuery } from "react-responsive";

type IconsType = { type: string; icon: string };

const rpgAwesomeIconList = rpgAwesomeIcons.map((icon) => ({
  type: "rpgawesome",
  icon: `ra ra-${icon}`,
}));

const iconList = [
  ...rpgAwesomeIconList,
  ...Object.keys(fas).map((icon) => ({
    type: "fontawesome",
    icon: icon
      .substring(2)
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/^-/, ""),
  })),
];

function EditableIcons({
  value: initialValue,
  onSave,
  editing,
  setEditing,
  isTruncated,
  isDisabled,
  ...props
}: {
  value: string;
  onSave: (newValues: string) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
  isTruncated?: boolean;
  isDisabled?: boolean;
  showTooltip?: boolean;
  tooltipContent?: React.JSX.Element | string;
}) {
  const [editedValue, setEditedValue] = useState(initialValue);
  const [selectedStyle, setSelectedStyle] = useState("fas");
  const [selectedIcon, setSelectedIcon] = useState<IconsType | null>(null);
  const [faPage, setFAPage] = useState(1);
  const [rpgPage, setRPGPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [faPageInput, setFAPageInput] = useState("");
  const [rpgPageInput, setRPGPageInput] = useState("");

  useEffect(() => {
    const stylePrefix = initialValue.split(" ")[0];
    if (["fas", "far", "fal", "fad", "fat"].includes(stylePrefix)) {
      setSelectedStyle(stylePrefix);
    } else {
      setSelectedStyle("fas");
    }
  }, []);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 576px)" });
  const numIconsOnPage = 24;

  const handleFAPageChange: (pageNumber: number) => void = (
    pageNumber: number
  ) => {
    setFAPage(pageNumber);
    setFAPageInput(pageNumber.toString());
    setRPGPage(1);
  };

  const handleRPGPageChange: (pageNumber: number) => void = (
    pageNumber: number
  ) => {
    setRPGPage(pageNumber);
    setRPGPageInput(pageNumber.toString());
    setFAPage(1);
  };

  const handleIconSelect = (icon: IconsType, style?: string) => {
    setSelectedIcon(icon);
    let newValue = "";
    if (icon.type === "fontawesome") {
      // Use the provided style if it exists, otherwise use the current selectedStyle
      newValue = `${style || selectedStyle} fa-${icon.icon}`;
    } else {
      newValue = icon.icon;
    }
    setEditedValue(newValue);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onSave(editedValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(initialValue);
    setEditing(false);
  };

  const filterIcons = (icons: IconsType[]) => {
    if (searchTerm === "") {
      return icons;
    }
    return icons.filter((icon) => icon.icon.includes(searchTerm.toLowerCase()));
  };

  const faIcons = iconList.filter((icon) => icon.type === "fontawesome");
  const rpgIcons = iconList.filter((icon) => icon.type === "rpgawesome");
  const faPages = Math.ceil(filterIcons(faIcons).length / numIconsOnPage);
  const rpgPages = Math.ceil(filterIcons(rpgIcons).length / numIconsOnPage);

  return (
    <div className="editing">
      {editing ? (
        <Modal
          show={editing}
          onHide={handleCancel}
          className="edit-icons"
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Icon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="icon-search">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <FormControl
                as="input"
                placeholder="Search for icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-description="Search for icons"
              />
            </InputGroup>
            <Tabs defaultActiveKey="fontawesome" id="icon-tabs">
              <Tab eventKey="fontawesome" title="FontAwesome">
                {/* FontAwesome icons */}
                <ToggleButtonGroup
                  type="radio"
                  name="fa-styles"
                  defaultValue={1}
                  className="fa-styles"
                  value={
                    selectedStyle === "fas"
                      ? 1
                      : selectedStyle === "far"
                      ? 2
                      : selectedStyle === "fal"
                      ? 3
                      : selectedStyle === "fad"
                      ? 4
                      : selectedStyle === "fat"
                      ? 5
                      : 1 // default to 'fas'
                  }
                >
                  <ToggleButton
                    onClick={() => {
                      setSelectedStyle("fas");
                      if (selectedIcon) handleIconSelect(selectedIcon, "fas");
                    }}
                    id="fas"
                    value={1}
                  >
                    Solid
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => {
                      setSelectedStyle("far");
                      if (selectedIcon) handleIconSelect(selectedIcon, "far");
                    }}
                    id="far"
                    value={2}
                  >
                    Regular
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => {
                      setSelectedStyle("fal");
                      if (selectedIcon) handleIconSelect(selectedIcon, "fal");
                    }}
                    id="fal"
                    value={3}
                  >
                    Light
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => {
                      setSelectedStyle("fad");
                      if (selectedIcon) handleIconSelect(selectedIcon, "fad");
                    }}
                    id="fad"
                    value={4}
                  >
                    Duotone
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => {
                      setSelectedStyle("fat");
                      if (selectedIcon) handleIconSelect(selectedIcon, "fat");
                    }}
                    id="fat"
                    value={5}
                  >
                    Thin
                  </ToggleButton>
                </ToggleButtonGroup>
                <div className="icon-grid">
                  {filterIcons(faIcons)
                    .slice(
                      (faPage - 1) * numIconsOnPage,
                      faPage * numIconsOnPage
                    )
                    .map((icon, index) => {
                      const iconDefinition = findIconDefinition({
                        prefix: "fas",
                        iconName: icon.icon as IconName,
                      });

                      return (
                        <div
                          key={index}
                          onClick={() => handleIconSelect(icon)}
                          className={
                            icon === selectedIcon
                              ? "icon-grid-icon selected-icon"
                              : "icon-grid-icon"
                          }
                        >
                          {iconDefinition ? (
                            <FontAwesomeIcon icon={icon.icon as IconProp} />
                          ) : (
                            <FontAwesomeIcon icon="question" />
                          )}
                          <div className="icon-text">{icon.icon}</div>
                        </div>
                      );
                    })}
                </div>
                <div className="icon-pagination-container">
                  <Row>
                    <Col sm={12} lg={10}>
                      <Pagination>
                        <Pagination.First
                          onClick={() => handleFAPageChange(1)}
                        />
                        <Pagination.Prev
                          onClick={() =>
                            handleFAPageChange(Math.max(1, faPage - 1))
                          }
                        />
                        {!isSmallScreen && faPage !== 1 && (
                          <Pagination.Item
                            onClick={() => handleFAPageChange(1)}
                          >
                            1
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && faPage > 3 && (
                          <Pagination.Ellipsis />
                        )}
                        {!isSmallScreen && faPage > 2 && (
                          <Pagination.Item
                            onClick={() => handleFAPageChange(faPage - 2)}
                          >
                            {faPage - 2}
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && faPage > 1 && (
                          <Pagination.Item
                            onClick={() => handleFAPageChange(faPage - 1)}
                          >
                            {faPage - 1}
                          </Pagination.Item>
                        )}
                        <Pagination.Item active>{faPage}</Pagination.Item>
                        {faPage < faPages && (
                          <Pagination.Item
                            onClick={() => handleFAPageChange(faPage + 1)}
                          >
                            {faPage + 1}
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && faPage < faPages - 1 && (
                          <Pagination.Item
                            onClick={() => handleFAPageChange(faPage + 2)}
                          >
                            {faPage + 2}
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && faPage < faPages - 2 && (
                          <Pagination.Ellipsis />
                        )}
                        {!isSmallScreen && faPage < faPages - 2 && (
                          <Pagination.Item
                            onClick={() =>
                              handleFAPageChange(
                                Math.min(
                                  Math.ceil((faPage + 9) / 10) * 10,
                                  faPages
                                )
                              )
                            }
                          >
                            {Math.min(
                              Math.ceil((faPage + 9) / 10) * 10,
                              faPages
                            )}
                          </Pagination.Item>
                        )}
                        <Pagination.Next
                          onClick={() =>
                            handleFAPageChange(Math.min(faPages, faPage + 1))
                          }
                        />
                        <Pagination.Last
                          onClick={() => handleFAPageChange(faPages)}
                        />
                        <Pagination.Item disabled>
                          Page {faPage} of {faPages}
                        </Pagination.Item>
                      </Pagination>
                    </Col>
                    <Col>
                      <InputGroup>
                        <InputGroup.Text id="faPageJump">
                          Jump to
                        </InputGroup.Text>
                        <FormControl
                          value={faPageInput}
                          onChange={(e) => setFAPageInput(e.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleFAPageChange(Number(faPageInput));
                            }
                          }}
                          aria-describedby="faPageJump"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey="rpgawesome" title="RPGAwesome">
                {/* RPGAwesome icons */}
                <div className="icon-grid">
                  {filterIcons(rpgIcons)
                    .slice(
                      (rpgPage - 1) * numIconsOnPage,
                      rpgPage * numIconsOnPage
                    )
                    .map((icon, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => handleIconSelect(icon)}
                          className={
                            icon === selectedIcon
                              ? "icon-grid-icon selected-icon"
                              : "icon-grid-icon"
                          }
                        >
                          <i className={`${icon.icon}`} />
                          <div className="icon-text">{icon.icon}</div>
                        </div>
                      );
                    })}
                </div>
                <div className="icon-pagination-container">
                  <Row>
                    <Col sm={12} lg={10}>
                      <Pagination>
                        <Pagination.First
                          onClick={() => handleRPGPageChange(1)}
                        />
                        <Pagination.Prev
                          onClick={() =>
                            handleRPGPageChange(Math.max(1, rpgPage - 1))
                          }
                        />
                        {!isSmallScreen && rpgPage !== 1 && (
                          <Pagination.Item
                            onClick={() => handleRPGPageChange(1)}
                          >
                            1
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && rpgPage > 3 && (
                          <Pagination.Ellipsis />
                        )}
                        {!isSmallScreen && rpgPage > 2 && (
                          <Pagination.Item
                            onClick={() => handleRPGPageChange(rpgPage - 2)}
                          >
                            {rpgPage - 2}
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && rpgPage > 1 && (
                          <Pagination.Item
                            onClick={() => handleRPGPageChange(rpgPage - 1)}
                          >
                            {rpgPage - 1}
                          </Pagination.Item>
                        )}
                        <Pagination.Item active>{rpgPage}</Pagination.Item>
                        {rpgPage < rpgPages && (
                          <Pagination.Item
                            onClick={() => handleRPGPageChange(rpgPage + 1)}
                          >
                            {rpgPage + 1}
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && rpgPage < rpgPages - 1 && (
                          <Pagination.Item
                            onClick={() => handleRPGPageChange(rpgPage + 2)}
                          >
                            {rpgPage + 2}
                          </Pagination.Item>
                        )}
                        {!isSmallScreen && rpgPage < rpgPages - 2 && (
                          <Pagination.Ellipsis />
                        )}
                        {!isSmallScreen && rpgPage < rpgPages - 2 && (
                          <Pagination.Item
                            onClick={() =>
                              handleRPGPageChange(
                                Math.min(
                                  Math.ceil((rpgPage + 9) / 10) * 10,
                                  rpgPages
                                )
                              )
                            }
                          >
                            {Math.min(
                              Math.ceil((rpgPage + 9) / 10) * 10,
                              rpgPages
                            )}
                          </Pagination.Item>
                        )}
                        <Pagination.Next
                          onClick={() =>
                            handleRPGPageChange(Math.min(rpgPages, rpgPage + 1))
                          }
                        />
                        <Pagination.Last
                          onClick={() => handleRPGPageChange(rpgPages)}
                        />
                        <Pagination.Item disabled>
                          Page {rpgPage} of {rpgPages}
                        </Pagination.Item>
                      </Pagination>
                    </Col>
                    <Col>
                      <InputGroup>
                        <InputGroup.Text id="rpgPageJump">
                          Jump to
                        </InputGroup.Text>
                        <FormControl
                          value={rpgPageInput}
                          onChange={(e) => setRPGPageInput(e.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleRPGPageChange(Number(rpgPageInput));
                            }
                          }}
                          aria-describedby="rpgPageJump"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </Tab>
            </Tabs>
            <InputGroup>
              <InputGroup.Text id="icon-input">Icon Text</InputGroup.Text>
              <FormControl
                as="input"
                className="icon-input"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                aria-describedby="icon-input"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div>
          <OverlayTrigger
            overlay={
              <Tooltip id={`tooltip`} data-bs-theme="light">
                {(() => {
                  if (editedValue && editedValue.startsWith("fa")) {
                    let iconName = editedValue.split(" ")[1];
                    iconName = iconName
                      .substring(2)
                      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
                      .replace(/^-/, "");
                    const isIconInList = faIcons.some(
                      (icon) => icon.icon === iconName
                    );
                    if (isIconInList) {
                      return (
                        <FontAwesomeIcon icon={["fas", iconName as IconName]} />
                      );
                    } else {
                      return <FontAwesomeIcon icon={["fas", "question"]} />;
                    }
                  } else {
                    return <span className={editedValue}></span>;
                  }
                })()}
              </Tooltip>
            }
          >
            <div
              className={isTruncated ? "icon-text text-truncate" : "icon-text"}
              {...props}
            >
              {editedValue}
            </div>
          </OverlayTrigger>
          <Button
            variant="primary"
            className="cell-edit"
            onClick={handleEdit}
            disabled={isDisabled}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default EditableIcons;
