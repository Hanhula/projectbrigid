import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

export const tagsFromValue = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

type TagsFieldProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

// Shared tag-chip input used everywhere tags are edited (articles, tables, images) so the
// interaction (comma/tab to commit, paste splitting, etc) and look stay consistent.
export default function TagsField({
  value,
  onChange,
  name = "tags",
  className = "tags-field react-tagsinput form-control",
  onKeyUp,
}: TagsFieldProps) {
  const tags = tagsFromValue(value);

  const handleChange = (newTags: string[]) => {
    const normalizedTags = newTags.map((tag) => tag.trim()).filter(Boolean);
    onChange(normalizedTags.join(","));
  };

  return (
    <TagsInput
      className={className}
      value={tags}
      onChange={handleChange}
      inputProps={{ name, placeholder: "Enter tags", onKeyUp }}
      addOnBlur
      addKeys={["Tab", ","]}
      addOnPaste
      pasteSplit={(data) => data.split(",").map((tag) => tag.trim())}
    />
  );
}
