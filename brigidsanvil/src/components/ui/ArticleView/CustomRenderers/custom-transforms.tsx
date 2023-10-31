import Link from "next/link";
import parse, { DOMNode } from "html-react-parser";
import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

export function elementToString(element: DOMNode): string {
  if (element.type === "text") {
    //@ts-expect-error
    return element.data;
    //@ts-expect-error
  } else if (element.name === "br") {
    return "<br>";
    //@ts-expect-error
  } else if (element.children && element.children.length > 0) {
    //@ts-expect-error
    const childStrings = element.children.map((child, index) => {
      return elementToString(child);
    });

    //@ts-expect-error
    if (element.attribs.href) {
      //@ts-expect-error
      return `<${element.name} href="${
        //@ts-expect-error
        element.attribs.href
        //@ts-expect-error
      }">${childStrings.join("")}</${element.name}>`;
    } else {
      //@ts-expect-error
      return `<${element.name || ""}>${childStrings.join("")}</${
        //@ts-expect-error
        element.name || ""
      }>`;
    }
  } else {
    //@ts-expect-error
    return `<${element.name || ""}></${element.name || ""}>`;
  }
}

export const customTransform = (domNode: DOMNode) => {
  //@ts-expect-error
  if (domNode.type === "tag" && domNode.name === "customurl") {
    // @ts-expect-error
    const reactChildren = domNode.children.map(
      (childNode: DOMNode, index: number) => {
        if (childNode.type === "text") {
          // @ts-expect-error
          return childNode.data;
        } else {
          return null;
        }
      }
    );

    return (
      // @ts-expect-error
      <Link href={domNode.attribs.href}>
        {reactChildren.filter((child: any) => child !== null)}
      </Link>
    );
  }

  //@ts-expect-error
  if (domNode.type === "tag" && domNode.name === "customspoiler") {
    //@ts-expect-error
    const spoilerTitle = domNode.children.find(
      //@ts-expect-error
      (child) => child.name && child.name === "button"
    );
    //@ts-expect-error
    const spoilerContent = domNode.children.find(
      //@ts-expect-error
      (child) => child.name && child.name === "collapse"
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

export const CustomSpoiler: React.FC<{ title: Element; content: DOMNode }> = ({
  title,
  content,
}) => {
  const [open, setOpen] = useState(false);

  //@ts-expect-error
  let titleText = title.children ? title.children[0].data : "Spoiler";

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
