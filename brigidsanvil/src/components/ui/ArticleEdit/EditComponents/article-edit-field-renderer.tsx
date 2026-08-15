import { Article } from "@/components/types/article";
import { World } from "@/components/types/world";
import { Form } from "react-bootstrap";
import BBCodeEditor from "./bbcode-editor";
import DebouncedDropdown from "./debounced-dropdown";
import DebouncedFieldDropdown, {
  FieldDropdownOption,
} from "./debounced-field-dropdown";
import DebouncedInput from "./debounced-input";

export type ArticleFieldConfig<TArticle extends Article = Article> =
  | {
      key: string;
      kind: "bbcode";
      fieldIdentifier: string;
      label?: string;
      showWhen?: (article: TArticle) => boolean;
    }
  | {
      key: string;
      kind: "text";
      fieldIdentifier: string;
      label: string;
      mentions?: boolean;
      helpText?: string;
      showWhen?: (article: TArticle) => boolean;
    }
  | {
      key: string;
      kind: "dropdown";
      fieldIdentifier: string;
      label: string;
      entityClass: string[];
      isMulti?: boolean;
      helpText?: string;
      showWhen?: (article: TArticle) => boolean;
    }
  | {
      key: string;
      kind: "field-dropdown";
      fieldIdentifier: string;
      label: string;
      options: FieldDropdownOption[];
      valueAsReference?: boolean;
      helpText?: string;
      showWhen?: (article: TArticle) => boolean;
    }
  | {
      key: string;
      kind: "note";
      label: string;
      message: string;
      showWhen?: (article: TArticle) => boolean;
    };

export const renderArticleField = <TArticle extends Article>(
  field: ArticleFieldConfig<TArticle>,
  options: {
    article: TArticle;
    world: World;
    lastFocusedEditor: string;
    setLastFocusedEditor: (fieldIdentifier: string) => void;
    resetSignal: number;
  },
) => {
  const {
    article,
    world,
    lastFocusedEditor,
    setLastFocusedEditor,
    resetSignal,
  } = options;

  if (field.showWhen && !field.showWhen(article)) {
    return null;
  }

  if (field.kind === "bbcode") {
    return (
      <div key={field.key}>
        {field.label && <h3>{field.label}</h3>}
        <BBCodeEditor
          fieldIdentifier={field.fieldIdentifier}
          id={article.id}
          existingContent={article[field.fieldIdentifier] ?? ""}
          onFocus={setLastFocusedEditor}
          lastFocusedEditor={lastFocusedEditor}
          resetSignal={resetSignal}
        />
        <br />
      </div>
    );
  }

  if (field.kind === "note") {
    return (
      <Form key={field.key}>
        <Form.Label>{field.label}</Form.Label>
        <div className="text-muted small">{field.message}</div>
      </Form>
    );
  }

  if (field.kind === "dropdown") {
    return (
      <Form key={field.key}>
        <Form.Label>{field.label}</Form.Label>
        <DebouncedDropdown
          world={world}
          article={article}
          fieldIdentifier={field.fieldIdentifier}
          entityClass={field.entityClass}
          isMulti={field.isMulti}
        />
        {field.helpText && (
          <Form.Text className="text-muted">{field.helpText}</Form.Text>
        )}
      </Form>
    );
  }

  if (field.kind === "field-dropdown") {
    return (
      <Form key={field.key}>
        <Form.Label htmlFor={`${article.id}-${field.key}`}>
          {field.label}
        </Form.Label>
        <DebouncedFieldDropdown
          world={world}
          article={article}
          fieldIdentifier={field.fieldIdentifier}
          options={field.options}
          id={`${article.id}-${field.key}`}
          valueAsReference={field.valueAsReference}
        />
        {field.helpText && (
          <Form.Text className="text-muted">{field.helpText}</Form.Text>
        )}
      </Form>
    );
  }

  if (field.kind === "text" && field.mentions) {
    return (
      <Form key={field.key}>
        <Form.Label htmlFor={`${article.id}-${field.key}`}>
          {field.label}
        </Form.Label>
        <BBCodeEditor
          fieldIdentifier={field.fieldIdentifier}
          id={article.id}
          existingContent={article[field.fieldIdentifier] ?? ""}
          onFocus={setLastFocusedEditor}
          lastFocusedEditor={lastFocusedEditor}
          resetSignal={resetSignal}
          showToolbar={false}
          compact
        />
        {field.helpText && (
          <Form.Text className="text-muted">{field.helpText}</Form.Text>
        )}
      </Form>
    );
  }

  return (
    <Form key={field.key}>
      <Form.Label htmlFor={`${article.id}-${field.key}`}>
        {field.label}
      </Form.Label>
      <DebouncedInput
        world={world}
        article={article}
        fieldIdentifier={field.fieldIdentifier}
      />
      {field.helpText && (
        <Form.Text className="text-muted">{field.helpText}</Form.Text>
      )}
    </Form>
  );
};
