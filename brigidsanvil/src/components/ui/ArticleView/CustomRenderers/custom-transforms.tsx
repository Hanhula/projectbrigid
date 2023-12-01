import Link from "next/link";
import parse, { DOMNode } from "html-react-parser";
import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { fas, faSquare, IconName } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

export function elementToString(element: DOMNode): string {
  if (element.type === "text" && "data" in element) {
    return element.data || "";
  } else if ("name" in element && element.name === "br") {
    return "<br>";
  } else if (
    "children" in element &&
    element.children &&
    element.children.length > 0
  ) {
    const childStrings = element.children.map((child) => {
      return elementToString(child);
    });

    if (element.attribs.href) {
      return `<${element.name} href="${
        element.attribs.href
      }">${childStrings.join("")}</${element.name}>`;
    } else {
      return `<${element.name || ""}>${childStrings.join("")}</${
        element.name || ""
      }>`;
    }
  } else if ("name" in element) {
    return `<${element.name || ""}></${element.name || ""}>`;
  } else {
    return "";
  }
}

export const findIconByString = (iconName: string) => {
  const iconDefinition = findIconDefinition({
    prefix: "fas",
    iconName: iconName as IconName,
  });

  console.log(iconDefinition);

  if (iconDefinition) {
    return <FontAwesomeIcon icon={iconDefinition} />;
  } else {
    return <FontAwesomeIcon icon={faSquare} />;
  }
};

export const customTransform = (domNode: DOMNode) => {
  if (domNode.type === "tag" && "name" in domNode && domNode.name === "span") {
    const classes = domNode.attribs.class || "";
    const classList = classes.split(" ");
    const faIconClasses = classList.filter((className) =>
      className.startsWith("fa-")
    );

    const iconNameClass = faIconClasses.pop();

    if (iconNameClass) {
      const iconName = iconNameClass.replace("fa-", "");
      findIconByString(iconName);
    }
  } else if (
    domNode.type === "tag" &&
    "name" in domNode &&
    domNode.name === "customurl" &&
    "children" in domNode
  ) {
    const reactChildren = domNode.children.map(
      (childNode: DOMNode, index: number) => {
        if (childNode.type === "text" && "data" in childNode) {
          return childNode.data;
        } else {
          return null;
        }
      }
    );

    return (
      <Link href={domNode.attribs.href}>
        {reactChildren.filter((child: any) => child !== null)}
      </Link>
    );
  }

  if (
    domNode.type === "tag" &&
    "name" in domNode &&
    domNode.name === "customspoiler"
  ) {
    const spoilerTitle = domNode.children.find(
      (child) => "name" in child && child.name && child.name === "button"
    );
    const spoilerContent = domNode.children.find(
      (child) => "name" in child && child.name && child.name === "collapse"
    );

    if (spoilerTitle && spoilerContent) {
      return (
        <CustomSpoiler
          title={spoilerTitle}
          content={spoilerContent}
        ></CustomSpoiler>
      );
    }
  }
  return domNode; // Return the unchanged node for all other cases
};

export const CustomSpoiler: React.FC<{ title: DOMNode; content: DOMNode }> = ({
  title,
  content,
}) => {
  const [open, setOpen] = useState(false);

  let titleText =
    "children" in title && title.children && "data" in title.children[0]
      ? title.children[0].data
      : "Spoiler";

  let spoilerContentHTML = elementToString(content);
  let parsedContent = parse(spoilerContentHTML, {
    replace: customTransform,
  });

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="spoiler-content"
        aria-expanded={open}
      >
        {titleText || "Spoiler"}
      </Button>
      <Collapse in={open}>
        <div id="spoiler-content">{parsedContent}</div>
      </Collapse>
    </div>
  );
};
