import { Article, ArticleDisplay } from "../article";

export type Law = Article & {
  localization: string | null;
  manifestation: string | null;
  lawtype: string | null;
};

export class LawDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    localization: string | null;
    manifestation: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    type: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(law: Law) {
    super(law);

    this.body = {
      content: law.content ? law.content : null,
      localization: law.localization ? law.localization : null,
      manifestation: law.manifestation ? law.manifestation : null,
    };

    this.sidebar = {
      sidebarcontent: law.sidebarcontent ? law.sidebarcontent : null,
      sidepanelcontenttop: law.sidepanelcontenttop
        ? law.sidepanelcontenttop
        : null,
      type: law.lawtype ? law.lawtype : null,
      sidepanelcontent: law.sidepanelcontent ? law.sidepanelcontent : null,
      sidebarcontentbottom: law.sidebarcontentbottom
        ? law.sidebarcontentbottom
        : null,
    };
  }
}
