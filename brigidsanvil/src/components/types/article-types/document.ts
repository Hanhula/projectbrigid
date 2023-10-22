import { Article } from "../article";
import { Person } from "./person";

export type Document = Article & {
    contents: string;
    background: string | null;
    caveats: string | null;
    clauses: string | null;
    legality: string | null;
    term: string | null;
    publicity: string | null;
    medium: string;
    textreferences: string | null;
    authoringDate: string;
    ratificationDate: string | null;
    expirationDate: string | null;
    legacy: string | null;
    purpose: string | null;
    publicreaction: string | null;
    type: string;
    history: string | null;
    myth: string | null;
    relatedlocation: Location[];
    documentauthors: Person[];
}