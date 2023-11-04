import { Article, ArticleDisplay } from "../article";
import { Myth } from "./myth";

export type Prose = Article & {
  prose: string | null;
  sidenotes: string | null;
  myths: Myth[];
};

export class ProseDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    prose: string | null;
    sidenotes: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    myths: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(prose: Prose) {
    super(prose);

    this.body = {
      content: prose.content ? prose.content : null,
      prose: prose.prose ? prose.prose : null,
      sidenotes: prose.sidenotes ? prose.sidenotes : null,
    };

    this.sidebar = {
      sidebarcontent: prose.sidebarcontent ? prose.sidebarcontent : null,
      sidepanelcontenttop: prose.sidepanelcontenttop
        ? prose.sidepanelcontenttop
        : null,
      myths: prose.myths ? this.formatMentions(prose.myths) : null,
      sidepanelcontent: prose.sidepanelcontent ? prose.sidepanelcontent : null,
      sidebarcontentbottom: prose.sidebarcontentbottom
        ? prose.sidebarcontentbottom
        : null,
    };
  }
}
