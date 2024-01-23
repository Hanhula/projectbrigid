import { Column, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import Select from "react-select";
import { DebouncedInput } from "./debouncedinput";
import { TagOption } from "./table-helpers";

interface SelectStyles {
  control: (
    baseStyles: Record<string, any>,
    state: Record<string, any>
  ) => Record<string, any>;
  input: (baseStyles: Record<string, any>) => Record<string, any>;
  singleValue: (baseStyles: Record<string, any>) => Record<string, any>;
  multiValue: (baseStyles: Record<string, any>) => Record<string, any>;
  multiValueLabel: (baseStyles: Record<string, any>) => Record<string, any>;
  multiValueRemove: (baseStyles: Record<string, any>) => Record<string, any>;
  menuList: (baseStyles: Record<string, any>) => Record<string, any>;
  option: (
    baseStyles: Record<string, any>,
    state: Record<string, any>
  ) => Record<string, any>;
  placeholder: (baseStyles: Record<string, any>) => Record<string, any>;
  indicatorSeparator: (baseStyles: Record<string, any>) => Record<string, any>;
  menuPortal: (baseStyles: Record<string, any>) => Record<string, any>;
}

const selectStyles: SelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused
      ? "var(--darkest-terror)"
      : "var(--dark-terror)",
    borderColor: state.isFocused ? "var(--dark-terror)" : "var(--light-terror)",
    color: "var(--lightest-terror)",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: "var(--lightest-terror)",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    fontWeight: 400,
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
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "var(--lightest-terror)",
    fontWeight: 400,
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--dark-terror)",
  }),
  menuPortal: (baseStyles) => ({ ...baseStyles, zIndex: 9999 }),
};

export function Filter({
  column,
  table,
  filterType,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
  filterType: boolean;
}) {
  const filterValue = column.getFilterValue() || undefined;

  const handleTagFilterChange = (selectedOptions: TagOption[]) => {
    const selectedValues = selectedOptions
      ? selectedOptions
          .filter((option) => option.value !== "")
          .map((option) => option.value)
          .join(",")
      : "";

    column.setFilterValue(selectedValues || undefined);
  };

  if (column.id === "tags" && filterType) {
    const filteredData = table
      .getPreFilteredRowModel()
      .flatRows.filter((row) => row.original.tags !== null);

    const uniqueTagsSet = new Set<string>();

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
          styles={selectStyles}
          menuPortalTarget={document.body}
        />
        <div className="h-1" />
      </div>
    );
  } else if (column.id === "isDraft" || column.id === "isWip") {
    const columnFilterValue = column.getFilterValue();

    const options = [
      { value: "", label: "All" },
      { value: "true", label: "True" },
      { value: "false", label: "False" },
    ];

    return (
      <div>
        <div className="input-group">
          <Select
            options={options}
            value={options.find((option) => option.value === columnFilterValue)}
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : undefined;
              column.setFilterValue(
                value === "" ? undefined : value === "true"
              );
            }}
            styles={selectStyles}
            menuPortalTarget={document.body}
          />
        </div>
        <div className="h-1" />
      </div>
    );
  } else if (column.id === "state") {
    const columnFilterValue = column.getFilterValue();

    const options = [
      { value: "", label: "All" },
      { value: "public", label: "Public" },
      { value: "private", label: "Private" },
    ];

    return (
      <div className="state-select">
        <div className="input-group">
          <Select
            options={options}
            value={options.find((option) => option.value === columnFilterValue)}
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : undefined;
              column.setFilterValue(value);
            }}
            menuPortalTarget={document.body}
            styles={selectStyles}
          />
        </div>
        <div className="h-1" />
      </div>
    );
  } else if (column.id === "entityClass") {
    const columnFilterValue = column.getFilterValue() as string;
    const filteredData = table
      .getPreFilteredRowModel()
      .flatRows.filter((row) => row.original.entityClass !== null);

    const uniqueTypesSet = new Set<string>();

    filteredData.forEach((row) => {
      const types = row.original.entityClass
        ?.split(",")
        .map((type: string) => type.trim());
      if (types) {
        types.forEach((type: string) => uniqueTypesSet.add(type));
      }
    });

    const uniqueTypesArray: string[] = Array.from(uniqueTypesSet);

    const options = [
      { label: "All", value: "All" },
      ...uniqueTypesArray.map((type) => ({
        label: type,
        value: type,
      })),
    ];

    return (
      <div>
        <Select
          options={options}
          value={
            options.find((option) => option.value === columnFilterValue) || null
          }
          onChange={(selectedOption) =>
            column.setFilterValue(
              selectedOption?.value === "All" ? "" : selectedOption?.value || ""
            )
          }
          placeholder={`Type`}
          className={"table-select-type"}
          styles={selectStyles}
          menuPortalTarget={document.body}
        />
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
            placeholder={`Search...`}
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
