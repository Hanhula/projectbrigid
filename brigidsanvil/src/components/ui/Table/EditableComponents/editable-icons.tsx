import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
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

type IconsType = { type: string; icon: string };

const rpgAwesomeIcons = [
  { type: "rpgawesome", icon: "ra ra-dragon" },
  // Add more rpgawesome icons here
];

const iconList = [
  ...rpgAwesomeIcons,
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
  showTooltip = false,
  tooltipContent,
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

  const numIconsOnPage = 20;

  const handleFAPageChange = (pageNumber: number) => {
    setFAPage(pageNumber);
    setFAPageInput(pageNumber.toString());
    setRPGPage(1);
  };

  const handleRPGPageChange = (pageNumber: number) => {
    setRPGPage(pageNumber);
    setRPGPageInput(pageNumber.toString());
    setFAPage(1);
  };

  const handleIconSelect = (icon: IconsType) => {
    setSelectedIcon(icon);
    let newValue = "";
    if (icon.type === "fontawesome") {
      newValue = `${selectedStyle} fa-${icon.icon}`;
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
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Icon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              as="input"
              placeholder="Search for icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-description="Search for icons"
              className="icon-search"
            />
            <Tabs defaultActiveKey="fontawesome" id="icon-tabs">
              <Tab eventKey="fontawesome" title="FontAwesome">
                {/* FontAwesome icons */}
                <ToggleButtonGroup
                  type="radio"
                  name="fa-styles"
                  defaultValue={1}
                  className="fa-styles"
                >
                  <ToggleButton
                    onClick={() => setSelectedStyle("fas")}
                    id="fas"
                    value={1}
                  >
                    Solid
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setSelectedStyle("far")}
                    id="far"
                    value={2}
                  >
                    Regular
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setSelectedStyle("fal")}
                    id="fal"
                    value={3}
                  >
                    Light
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setSelectedStyle("fad")}
                    id="fad"
                    value={4}
                  >
                    Duotone
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
                <Pagination>
                  <Pagination.First onClick={() => handleFAPageChange(1)} />
                  <Pagination.Prev
                    onClick={() => handleFAPageChange(Math.max(1, faPage - 1))}
                  />
                  {faPage !== 1 && (
                    <Pagination.Item onClick={() => handleFAPageChange(1)}>
                      1
                    </Pagination.Item>
                  )}
                  {faPage > 3 && <Pagination.Ellipsis />}
                  {faPage > 2 && (
                    <Pagination.Item
                      onClick={() => handleFAPageChange(faPage - 2)}
                    >
                      {faPage - 2}
                    </Pagination.Item>
                  )}
                  {faPage > 1 && (
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
                  {faPage < faPages - 1 && (
                    <Pagination.Item
                      onClick={() => handleFAPageChange(faPage + 2)}
                    >
                      {faPage + 2}
                    </Pagination.Item>
                  )}
                  {faPage < faPages - 2 && <Pagination.Ellipsis />}
                  {faPage < faPages - 2 && (
                    <Pagination.Item
                      onClick={() =>
                        handleFAPageChange(Math.ceil((faPage + 10) / 10) * 10)
                      }
                    >
                      {Math.ceil((faPage + 10) / 10) * 10}
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
                  <InputGroup>
                    <InputGroup.Text id="faPageJump">Jump to</InputGroup.Text>
                    <FormControl
                      value={faPageInput}
                      onChange={(e) => setFAPageInput(e.target.value)}
                      onBlur={() => handleFAPageChange(Number(faPageInput))}
                      aria-describedby="faPageJump"
                    />
                  </InputGroup>
                </Pagination>
              </Tab>
              <Tab eventKey="rpgawesome" title="RPGAwesome">
                {/* RPGAwesome icons */}
                <div className="icon-grid">
                  <Row>
                    {filterIcons(rpgIcons)
                      .slice(
                        (rpgPage - 1) * numIconsOnPage,
                        rpgPage * numIconsOnPage
                      )
                      .map((icon, index) => {
                        return (
                          <Col>
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
                          </Col>
                        );
                      })}
                  </Row>
                </div>
                <Pagination>
                  {[...Array(rpgPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === rpgPage}
                      onClick={() => handleRPGPageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Tab>
            </Tabs>
            <FormControl
              as="input"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
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
          {showTooltip ? (
            <OverlayTrigger
              overlay={
                <Tooltip id={`tooltip`} data-bs-theme="light">
                  {tooltipContent}
                </Tooltip>
              }
            >
              <div
                className={
                  isTruncated ? "excerpt-text text-truncate" : "excerpt-text"
                }
                {...props}
              >
                {editedValue}
              </div>
            </OverlayTrigger>
          ) : (
            <div
              className={
                isTruncated ? "excerpt-text text-truncate" : "excerpt-text"
              }
              {...props}
            >
              {editedValue}
            </div>
          )}
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
