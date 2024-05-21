import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
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
import {
  Document,
  SimpleDocumentSearchResultSetUnit,
  StoreOption,
} from "flexsearch-ts";
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

  const [searchIndex, setSearchIndex] = useState<Document<
    unknown,
    StoreOption
  > | null>(null);
  const [searchResults, setSearchResults] = useState<
    SimpleDocumentSearchResultSetUnit[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [foundArticles, setFoundArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function initializeSearchIndexAsync() {
      const index = new Document({
        tokenize: "full",
        document: {
          id: "id",
          index: ["title", "content", ...searchableFields],
        },
      });

      const addDocumentPromises = articles.map((article) => {
        const searchObject = createSearchObject(article);
        const document = {
          id: article.id,
          title: article.title,
          content: article.content,
          ...searchObject,
        };
        return index.addAsync(document.id, document);
      });

      await Promise.all(addDocumentPromises);

      setSearchIndex(index);
      setIsIndexing(false);
    }

    initializeSearchIndexAsync();
  }, [articles]);

  const performSearch = () => {
    if (searchIndex) {
      const query = searchInputRef.current?.value || "";
      const searchResultArray = searchIndex.searchAsync(query);

      searchResultArray.then((results) => {
        const matchingArticles: Article[] = results
          .map((result: any) => {
            const articleIds = result.result;
            return articles.filter((article) =>
              articleIds.includes(article.id)
            );
          })
          .flat();

        const uniqueArticleIds = new Set();
        const filteredMatchingArticles = matchingArticles.filter((article) => {
          if (!uniqueArticleIds.has(article.id)) {
            uniqueArticleIds.add(article.id);
            return true;
          }
          return false;
        });

        const articlesWithFieldInfo = filteredMatchingArticles.map(
          (article) => {
            const fieldsInfo = results.filter((result: any) =>
              result.result.includes(article.id)
            );
            const foundInFields = fieldsInfo.map(
              (fieldInfo: any) => fieldInfo.field
            );
            return {
              ...article,
              foundInFields: foundInFields,
            };
          }
        );

        setFoundArticles(articlesWithFieldInfo);
        setSearchResults(results);
        setIsSearching(true);
      });
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      performSearch();
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
                    <h3>{`Matching Articles (${foundArticles.length})`}</h3>
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
                            <Card.Text as="div">
                              {matchingArticle.foundInFields &&
                                matchingArticle.foundInFields.length > 0 && (
                                  <span className="match-text">
                                    <dt>Matches found in:</dt>
                                    <dd>
                                      {matchingArticle.foundInFields.join(", ")}
                                    </dd>
                                  </span>
                                )}
                            </Card.Text>
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
