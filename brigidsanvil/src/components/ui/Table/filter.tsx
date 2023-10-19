import { Column, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import Select from "react-select";
import { DebouncedInput } from "./debouncedinput";
import { TagOption } from "./table";

export function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const filterValue = column.getFilterValue() || undefined;

  const handleTagFilterChange = (selectedOptions: TagOption[]) => {
    // Filter out empty strings from selectedValues
    const selectedValues = selectedOptions
      ? selectedOptions
          .filter((option) => option.value !== "") // Filter out empty strings
          .map((option) => option.value)
          .join(",")
      : "";

    // Check if selectedValues is empty, and if so, set the filter value to undefined
    column.setFilterValue(selectedValues || undefined);
  };

  if (column.id === "tags") {
    const filteredData = table
      .getPreFilteredRowModel()
      .flatRows.filter((row) => row.original.tags !== null);

    const uniqueTagsSet = new Set<string>();

    // Iterate through the filtered data and collect unique tags
    filteredData.forEach((row) => {
      const tags = row.original.tags
        ?.split(",")
        .map((tag: string) => tag.trim());
      if (tags) {
        tags.forEach((tag: string) => uniqueTagsSet.add(tag));
      }
    });

    const uniqueTagsArray: TagOption[] = Array.from(uniqueTagsSet).map(
      (tag) => ({
        label: tag,
        value: tag,
      })
    );

    return (
      <div>
        <Select
          isMulti
          options={uniqueTagsArray}
          value={
            filterValue
              ? (filterValue as string)
                  .split(",")
                  .map((value) =>
                    uniqueTagsArray.find((option) => option.value === value)
                  )
              : []
          }
          onChange={(value) => handleTagFilterChange(value as TagOption[])}
          placeholder={`Select Tags`}
          className={"table-select-tags"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused
                ? "var(--darkest-terror)"
                : "var(--dark-terror)",
              borderColor: state.isFocused
                ? "var(--dark-terror)"
                : "var(--light-terror)",
              color: "var(--lightest-terror)",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: "var(--lightest-terror)",
            }),
            multiValue: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "var(--primary)",
              borderColor: "var(--primary-dark)",
              borderRadius: "0.375rem",
            }),
            multiValueLabel: (baseStyles) => ({
              ...baseStyles,
              color: "white",
              fontWeight: 600,
            }),
            multiValueRemove: (baseStyles) => ({
              ...baseStyles,
              "&:hover": {
                backgroundColor: "var(--primary-dark)",
                borderColor: "var(--primary-dark)",
                color: "var(--create-light)",
              },
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "var(--darker-terror)",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused
                ? "var(--light-terror)"
                : "var(--darker-terror)",
              color: "var(--offwhite)",
            }),
          }}
        />
        <div className="h-1" />
      </div>
    );
  } else if (column.id === "isDraft") {
    const columnFilterValue = column.getFilterValue();

    return (
      <div>
        <div className="input-group">
          <select
            value={
              columnFilterValue === true
                ? "true"
                : columnFilterValue === false
                ? "false"
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              column.setFilterValue(
                value === "" ? undefined : value === "true"
              );
            }}
            className="form-select"
          >
            <option value="">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="h-1" />
      </div>
    );
  } else {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    const getSortedUniqueValues = () => {
      return typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort();
    };

    // Include 'column' in the dependency array for React.useMemo
    const sortedUniqueValues = useMemo(getSortedUniqueValues, [
      firstValue,
      column,
    ]);

    return (
      <>
        <datalist id={column.id + "list"}>
          {sortedUniqueValues.slice(0, 5000).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <div className="input-group">
          <DebouncedInput
            type="text"
            value={(columnFilterValue ?? "") as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            className="form-control"
            list={column.id + "list"}
            data-bs-theme="dark"
          />
        </div>
        <div className="h-1" />
      </>
    );
  }
}
