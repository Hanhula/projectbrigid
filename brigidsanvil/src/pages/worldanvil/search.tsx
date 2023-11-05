import { selectWorld } from "@/components/store/apiSlice";
import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article, ArticleTypes } from "@/components/types/article";
import {
  faFileEdit,
  faLink,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./search.scss";
import lunr from "lunr";
import { Organisation } from "@/components/types/article-types/organisation";
import {
  createSearchObject,
  searchableFields,
} from "@/components/ui/Search/searchobject";

function WorldAnvilSearch() {
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles?.articles || [];
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isIndexing, setIsIndexing] = useState(true); // Track the indexing process
  const [searchIndex, setSearchIndex] = useState<lunr.Index | null>(null);
  const [searchResults, setSearchResults] = useState<lunr.Index.Result[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [foundArticles, setFoundArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function initializeSearchIndexAsync() {
      const index = lunr(function () {
        this.ref("id");
        this.field("title");
        this.field("content");
        this.field("fullFooter");

        searchableFields.forEach((field) => {
          this.field(field);
        });

        articles.forEach((article) => {
          const searchObject = createSearchObject(article);
          this.add(searchObject);
        });
      });

      setSearchIndex(index);
      setIsIndexing(false); // Set indexing as complete
    }

    initializeSearchIndexAsync();
  }, [articles]);

  const performSearch = () => {
    if (searchIndex) {
      const query = searchInputRef.current?.value || "";
      const results = searchIndex.search(query);

      const matchingArticles: Article[] = results.reduce(
        (acc: Article[], result) => {
          const article = articles.find((a) => a.id === result.ref);
          if (article) {
            acc.push(article);
          }
          return acc;
        },
        []
      );

      setFoundArticles(matchingArticles);
      setSearchResults(results);
      setIsSearching(true);
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  const getSnippet = (article: Article) => {
    if (article.content) {
      console.log(article);
      const content = article.content;
      const snippetLength = 200;
      const searchTerms = (searchInputRef.current?.value || "").split(" ");

      let snippet = "";

      searchTerms.forEach((term) => {
        const searchTermIndex = content
          .toLowerCase()
          .indexOf(term.toLowerCase());
        if (searchTermIndex !== -1) {
          let start = Math.max(0, searchTermIndex - snippetLength / 2);
          let end = Math.min(
            content.length,
            searchTermIndex + snippetLength / 2
          );

          while (start > 0 && !/\s/.test(content[start])) {
            start--;
          }

          while (end < content.length && !/\s/.test(content[end])) {
            end++;
          }

          snippet += content.substring(start, end) + " ";
        }
      });

      if (snippet.length > snippetLength) {
        snippet = "..." + snippet.substring(1);
        if (snippet.length < content.length) {
          snippet += "...";
        }
      }

      snippet = snippet.trim();
      const parsedSnippet = WorldAnvilParser.parseField(snippet);

      return parsedSnippet;
    } else {
      return "";
    }
  };

  return (
    <div className="search-container container">
      <Head>
        <title>WorldAnvil Search</title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>WorldAnvil Search</h1>
          <p>
            Search your world for specific phrases. Specifically searches
            articles at the moment. You will need to have first fetched all of
            your articles.
          </p>
          <hr />
          {isIndexing && (
            <div className="worldanvil-search-indexing">
              <p>Indexing data... Please wait.</p>
            </div>
          )}
          {!isIndexing && (
            <div className="worldanvil-search-container">
              <div className="worldanvil-search">
                <InputGroup>
                  <InputGroup.Text id="waSearch-input">Search</InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="waSearch-input"
                    ref={searchInputRef}
                    onKeyDown={handleSearchKeyDown}
                  />
                  <Button variant="primary" onClick={performSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </div>
              <br />
              <div className="worldanvil-search-results">
                {isSearching && searchResults.length === 0 && (
                  <p>No results found.</p>
                )}
                {isSearching && searchResults.length > 0 && (
                  <div>
                    <h3>Matching Articles</h3>
                    {foundArticles.map((matchingArticle) => (
                      <div key={matchingArticle.id}>
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              <Link
                                href={`/worldanvil/articles/${matchingArticle.id}`}
                              >
                                {matchingArticle.title}
                              </Link>
                              <a href={matchingArticle.url}>
                                <Button
                                  className="link-url"
                                  variant="primary"
                                  size="sm"
                                >
                                  <FontAwesomeIcon icon={faLink} />
                                </Button>
                              </a>
                              <a href={matchingArticle.editURL}>
                                <Button
                                  className="edit-url"
                                  variant="primary"
                                  size="sm"
                                >
                                  <FontAwesomeIcon icon={faFileEdit} />
                                </Button>
                              </a>
                            </Card.Title>
                            <Card.Subtitle>
                              {matchingArticle.excerpt}
                            </Card.Subtitle>
                            <hr />
                            <Card.Text>{getSnippet(matchingArticle)}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorldAnvilSearch;
