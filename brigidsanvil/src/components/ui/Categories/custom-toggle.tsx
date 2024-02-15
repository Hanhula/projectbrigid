import { ReactNode } from "react";
import { Button, useAccordionButton } from "react-bootstrap";

export interface CustomToggleProps {
  children: ReactNode;
  eventKey: string;
}

export function CustomToggle({ children, eventKey }: CustomToggleProps) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <Button variant="link" onClick={decoratedOnClick}>
      {children}
    </Button>
  );
}
