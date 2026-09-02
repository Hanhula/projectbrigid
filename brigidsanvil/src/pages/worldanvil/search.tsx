import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { selectImagesByWorld } from "@/components/store/imagesSlice";
import { Article } from "@/components/types/article";
import { Image } from "@/components/types/image";
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
import {
  createImageSearchDocument,
  imageSearchableFields,
} from "@/components/ui/Search/image-searchobject";

function WorldAnvilSearch() {
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles?.articles || [];
  const images = useSelector(selectImagesByWorld(world.id));
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isIndexingArticles, setIsIndexingArticles] = useState(true);
  const [isIndexingImages, setIsIndexingImages] = useState(true);
  const isIndexing = isIndexingArticles || isIndexingImages;

  const [searchIndex, setSearchIndex] = useState<Document<
    unknown,
    StoreOption
  > | null>(null);
  const [imageSearchIndex, setImageSearchIndex] = useState<Document<
    unknown,
    StoreOption
  > | null>(null);
  const [searchResults, setSearchResults] = useState<
    SimpleDocumentSearchResultSetUnit[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [foundArticles, setFoundArticles] = useState<Article[]>([]);
  const [foundImages, setFoundImages] = useState<Image[]>([]);

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
      setIsIndexingArticles(false);
    }

    initializeSearchIndexAsync();
  }, [articles]);

  useEffect(() => {
    async function initializeImageSearchIndexAsync() {
      const index = new Document({
        tokenize: "full",
        document: {
          id: "id",
          index: imageSearchableFields,
        },
      });

      const addDocumentPromises = images.map((image) => {
        const document = createImageSearchDocument(image);
        return index.addAsync(document.id, document);
      });

      await Promise.all(addDocumentPromises);

      setImageSearchIndex(index);
      setIsIndexingImages(false);
    }

    initializeImageSearchIndexAsync();
  }, [images]);

  const performSearch = async () => {
    const query = searchInputRef.current?.value || "";

    const articleSearchPromise = searchIndex
      ? searchIndex.searchAsync(query)
      : Promise.resolve<SimpleDocumentSearchResultSetUnit[]>([]);
    const imageSearchPromise = imageSearchIndex
      ? imageSearchIndex.searchAsync(query)
      : Promise.resolve<SimpleDocumentSearchResultSetUnit[]>([]);

    const [results, imageResults] = await Promise.all([
      articleSearchPromise,
      imageSearchPromise,
    ]);

    const matchingArticles: Article[] = results
      .map((result: any) => {
        const articleIds = result.result;
        return articles.filter((article) => articleIds.includes(article.id));
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

    const articlesWithFieldInfo = filteredMatchingArticles.map((article) => {
      const fieldsInfo = results.filter((result: any) =>
        result.result.includes(article.id),
      );
      const foundInFields = fieldsInfo.map((fieldInfo: any) => fieldInfo.field);
      return {
        ...article,
        foundInFields: foundInFields,
      };
    });

    const matchingImages: Image[] = imageResults
      .map((result: any) => {
        const imageIds = result.result;
        return images.filter((image) => imageIds.includes(image.id));
      })
      .flat();

    const uniqueImageIds = new Set();
    const filteredMatchingImages = matchingImages.filter((image) => {
      if (!uniqueImageIds.has(image.id)) {
        uniqueImageIds.add(image.id);
        return true;
      }
      return false;
    });

    setFoundArticles(articlesWithFieldInfo);
    setFoundImages(filteredMatchingImages);
    setSearchResults(results);
    setIsSearching(true);
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
            Search your world for specific phrases. Searches articles and
            images. You will need to have first fetched all of your articles
            and/or images.
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
                {isSearching &&
                  foundArticles.length === 0 &&
                  foundImages.length === 0 && <p>No results found.</p>}
                {isSearching && searchResults.length > 0 && (
                  <div>
                    <h3>{`Matching Articles (${foundArticles.length})`}</h3>
                    {foundArticles.map((matchingArticle) => (
                      <div key={matchingArticle.id}>
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              <Link
                                href={`/worldanvil/articles/${matchingArticle.id}/view`}
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
                {isSearching && foundImages.length > 0 && (
                  <div>
                    <h3>{`Matching Images (${foundImages.length})`}</h3>
                    <div className="worldanvil-search-image-results">
                      {foundImages.map((matchingImage) => (
                        <Card
                          key={matchingImage.id}
                          className="search-image-card"
                        >
                          <Card.Img
                            variant="top"
                            src={matchingImage.url}
                            alt={matchingImage.alt || matchingImage.title}
                            style={{ height: 140, objectFit: "cover" }}
                          />
                          <Card.Body>
                            <Card.Title
                              className="text-truncate"
                              title={matchingImage.title}
                              style={{ fontSize: "1rem" }}
                            >
                              {matchingImage.title}
                            </Card.Title>
                            <div className="d-flex gap-2">
                              <a
                                href={matchingImage.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Button variant="primary" size="sm">
                                  <FontAwesomeIcon icon={faLink} />
                                </Button>
                              </a>
                              <Link href="/worldanvil/images">
                                <Button variant="secondary" size="sm">
                                  <FontAwesomeIcon icon={faFileEdit} />
                                </Button>
                              </Link>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
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
