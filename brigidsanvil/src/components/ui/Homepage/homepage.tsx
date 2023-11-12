import { Component } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./homepage.scss";

export default class Homepage extends Component {
  render() {
    return (
      <div className="container text-center homepage">
        <h1 className="display-1">{"Brigid's Anvil"}</h1>
        <div className="description">
          {
            "Project Brigid is a community-led effort to develop extra tools for WorldAnvil, largely developed by Hanhula using WorldAnvil's Boromir API. Here, you will find utilities to see your world in ways that the site itself does not yet offer."
          }
        </div>
        <br />
        <h2>Check out the tools!</h2>
        <div className="row">
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title>Article Explorer</Card.Title>
                <Card.Text>
                  {"Filter, sort, view, export, and edit your articles."}
                </Card.Text>
                <Link href="/worldanvil/apitool">
                  <Button variant="primary">Go to Article Explorer</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title>Statistics</Card.Title>
                <Card.Text>
                  {
                    "View some current stats for your selected world. Requires a world to be selected!"
                  }
                </Card.Text>
                <Link href="/worldanvil/statistics">
                  <Button variant="primary">Go to Statistics</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title>Search</Card.Title>
                <Card.Text>
                  {
                    "Search across your world's articles! May be laggy; searches all fields!"
                  }
                </Card.Text>
                <Link href="/worldanvil/search">
                  <Button variant="primary">Go to Search</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title>Quick Links</Card.Title>
                <Card.Text>
                  {
                    "Quick links to pages on WorldAnvil! Kind of a second Dashboard."
                  }
                </Card.Text>
                <Link href="/worldanvil/quicklinks">
                  <Button variant="primary">Go to Quick Links</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
