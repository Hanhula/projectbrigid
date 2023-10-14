import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "@/components/ui/Homepage/homepage";

/* THIS IS A PLACEHOLDER TEST FILE AND SHOULD NOT BE USED TO GENERALLY JUDGE HOW TESTING THE PROJECT SHOULD GO. I'll set up naming conventions later on!*/

describe("Homepage Component", () => {
  test("should render the title", () => {
    render(<Homepage />);
    const titleElement = screen.getByText("Brigid's Anvil");
    expect(titleElement).toBeInTheDocument();
  });

  test("should render the description", () => {
    render(<Homepage />);
    const descriptionElement = screen.getByText(
      "Project Brigid is a community-led effort to develop extra tools for WorldAnvil. Here, you will find utilities to see your world in ways that the site itself does not yet offer."
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  test("should render 'Check out the tools!' heading", () => {
    render(<Homepage />);
    const headingElement = screen.getByText("Check out the tools!");
    expect(headingElement).toBeInTheDocument();
  });

  test("should render API Tool card", () => {
    render(<Homepage />);
    const apiToolCard = screen.getByText("API Tool");
    expect(apiToolCard).toBeInTheDocument();
  });

  test("should render Statistics card", () => {
    render(<Homepage />);
    const statisticsCard = screen.getByText("Statistics");
    expect(statisticsCard).toBeInTheDocument();
  });

  test("should have a link to the API Tool page", () => {
    render(<Homepage />);
    const apiToolLink = screen.getByRole("link", { name: "Go to API Tool" });
    expect(apiToolLink).toHaveAttribute("href", "/worldanvil/apitool");
  });

  test("should have a link to the Statistics page", () => {
    render(<Homepage />);
    const statisticsLink = screen.getByRole("link", {
      name: "Go to Statistics",
    });
    expect(statisticsLink).toHaveAttribute("href", "/worldanvil/statistics");
  });
});
