import { selectWorld } from "@/components/store/apiSlice";
import Head from "next/head";
import React from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./search.scss";
import { Category } from "@/components/types/category";

const categories: Category[] = [
  {
    id: "493a0753-3f5e-48f7-8c99-2c4ef9a87610",
    title: "Aletheian Culture",
    slug: "aletheian-traditions-category",
    state: "public",
    isWip: null,
    isDraft: null,
    entityClass: "Category",
    icon: "fa-solid fa-folder",
    url: "http://www.worldanvil.com/w/istralar-hanhula/c/aletheian-traditions-category",
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
    description: null,
    excerpt: null,
    isBook: false,
    displayBookTitle: true,
    isCollapsed: false,
    position: null,
    creationDate: {
      date: "2021-06-15 18:17:04.000000",
      timezone_type: 3,
      timezone: "UTC",
    },
    views: 189,
    custom1: null,
    custom2: null,
    custom3: null,
    custom4: null,
    custom5: null,
    cssClasses: null,
    systemMeta:
      '{"catCol1":["custom1"],"catCol2":["custom2","toc"],"catCol3":["custom3","articleBlocks","featuresArticles"],"catCol4":["custom4","maps","timelines"],"catCol5":["custom5"]}',
    pagecover: null,
    bookcover: null,
    defaultarticlecover: null,
    parent: {
      id: "7f40f25f-5bbb-476e-b483-03707ddf6102",
      title: "Aletheian Inhabitants",
      slug: "aletheian-inhabitants-category",
      state: "public",
      isWip: null,
      isDraft: null,
      entityClass: "Category",
      icon: "fa-solid fa-folder",
      url: "http://www.worldanvil.com/w/istralar-hanhula/c/aletheian-inhabitants-category",
      subscribergroups: [],
      folderId: null,
      tags: null,
      updateDate: null,
    },
    world: {
      id: "06a063ad-0a66-43da-ab88-7ff2941b854a",
      title: "Istralar",
      slug: "istralar-hanhula",
      state: "public",
      isWip: null,
      isDraft: null,
      entityClass: "World",
      icon: "fa-solid fa-globe-stand",
      url: "http://www.worldanvil.com/w/istralar-hanhula",
      subscribergroups: [],
      folderId: "-1",
      tags: "",
      updateDate: {
        date: "2024-01-26 05:09:20.000000",
        timezone_type: 3,
        timezone: "UTC",
      },
    },
    articleRedirect: null,
    articles: [],
    editURL:
      "http://www.worldanvil.com/world/category/493a0753-3f5e-48f7-8c99-2c4ef9a87610/edit",
    isEditable: true,
    success: true,
  },
  {
    id: "7f40f25f-5bbb-476e-b483-03707ddf6102",
    title: "Aletheian Inhabitants",
    slug: "aletheian-inhabitants-category",
    state: "public",
    isWip: null,
    isDraft: null,
    entityClass: "Category",
    icon: "fa-solid fa-folder",
    url: "http://www.worldanvil.com/w/istralar-hanhula/c/aletheian-inhabitants-category",
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
];

function CategoryManager() {
  const world = useSelector(selectWorld);

  return (
    <Container fluid>
      <Head>
        <title>WorldAnvil Category Manager</title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>Category Manager </h1>
          <p>Organise your categories!</p>
          <hr />
        </div>
      </div>
    </Container>
  );
}

export default CategoryManager;
