import { Article, ArticleDisplay } from "../article";
import { Location } from "./location";
import { Myth } from "./myth";
import { Organisation } from "./organisation";
import { Person } from "./person";

export type Document = Article & {
    contents: string | null;
    background: string | null;
    caveats: string | null;
    clauses: string | null;
    legality: string | null;
    term: string | null;
    publicity: string | null;
    medium: string | null;
    textreferences: string | null;
    authoringDate: string | null;
    ratificationDate: string | null;
    expirationDate: string | null;
    legacy: string | null;
    purpose: string | null;
    publicreaction: string | null;
    type: string | null;
    history: string | null;
    myth: Myth | null;
    relatedlocation: Location | null;
    documentauthors: Person[] | null;
    signatorycharacters: Person[] | null;
    signatoryorganizations: Organisation[] | null;
}

export class DocumentDisplay extends ArticleDisplay {
    body: {
      content: string | null;
      purpose: string | null;
      clauses: string | null;
      caveats: string | null;
      references: string | null;
      publicationStatus: string | null;
      legalStatus: string | null;
      background: string | null;
      history: string | null;
      publicReaction: string | null;
      legacy: string | null;
      term: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      type: string | null;
      medium: string | null;
      authoringDate: string | null;
      ratificationDate: string | null;
      expirationDate: string | null;
      myth: string | null;
      location: string | null;
      authors: string | null;
      signatories: string | null;
      signatoryOrganisations: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    };
  
    constructor(document: Document) {
      super(document);
  
      this.header = {
        subheading: document.subheading ? document.subheading : null,
      };
  
      this.body = {
        content: document.content ? document.content : null,
        purpose: document.purpose ? document.purpose : null,
        clauses: document.clauses ? document.clauses : null,
        caveats: document.caveats ? document.caveats : null,
        references: document.textreferences ? document.textreferences : null,
        publicationStatus: document.publicity ? document.publicity : null,
        legalStatus: document.legality ? document.legality : null,
        background: document.background ? document.background : null,
        history: document.history ? document.history : null,
        publicReaction: document.publicreaction ? document.publicreaction : null,
        legacy: document.legacy ? document.legacy : null,
        term: document.term ? document.term : null,
      };
  
      this.sidebar = {
        sidebarcontent: document.sidebarcontent ? document.sidebarcontent : null,
        sidepanelcontenttop: document.sidepanelcontenttop
          ? document.sidepanelcontenttop
          : null,
        type: document.type ? document.type : null,
        medium: document.type ? document.type : null,
        authoringDate: document.authoringDate ? String(document.authoringDate) : null,
        ratificationDate: document.ratificationDate ? String(document.ratificationDate) : null,
        expirationDate: document.expirationDate ? String(document.expirationDate) : null,
        myth: document.myth ? this.formatMention(document.myth) : null,
        location: document.relatedlocation ? this.formatMention(document.relatedlocation) : null,
        authors: document.documentauthors ? this.formatMentions(document.documentauthors) : null,
        signatories: document.signatorycharacters ? this.formatMentions(document.signatorycharacters) : null,
        signatoryOrganisations: document.signatoryorganizations ? this.formatMentions(document.signatoryorganizations) : null,
        sidepanelcontent: document.sidepanelcontent ? document.sidepanelcontent : null,
        sidebarcontentbottom: document.sidebarcontentbottom
          ? document.sidebarcontentbottom
          : null,
      };
    }
  }