import * as React from "react";
import { Article } from "@/components/types/article";
import Select from "react-select";

import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  Row,
  ColumnFiltersState,
  Column,
  Table,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { Dropdown, Form, Table as BootstrapTable } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faChevronRight,
  faChevronDown,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import { selectCurrentDetailStateByWorld } from "@/components/store/articlesSlice";
import { useSelector } from "react-redux";
import { selectWorld } from "@/components/store/apiSlice";

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
};

let minDetailColumns: ColumnDef<Article>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          className="btn btn-secondary"
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          {row.getIsExpanded() ? (
            <FontAwesomeIcon icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
      ) : (
        "🔵"
      );
    },
  },
  {
    accessorFn: (row) => row.title,
    id: "title",
    cell: (info) => info.getValue(),
    header: "Title",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.entityClass,
    id: "entityClass",
    cell: (info) => info.getValue(),
    header: "Type",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.url,
    id: "url",
    cell: (info: any) => <a href={info.getValue() as string}>Link</a>,
    header: "Link",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.state,
    id: "state",
    cell: (info) => info.getValue(),
    header: "State",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.isDraft,
    id: "isDraft",
    cell: (info) => String(info.getValue()),
    header: "Is Draft?",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.tags,
    id: "tags",
    cell: (info) => {
      const tagValue = info.getValue();
      const tags = (tagValue || "").toString();

      return (
        <div>
          {tags.split(",").map((tag, index) => (
            <span key={index} className="badge text-bg-secondary">
              {tag}
            </span>
          ))}
        </div>
      );
    },
    header: "Tags",
    footer: (props) => props.column.id,
  },
];

let fullDetailColumns: ColumnDef<Article>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          className="btn btn-secondary"
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          {row.getIsExpanded() ? (
            <FontAwesomeIcon icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
      ) : (
        "🔵"
      );
    },
  },
  {
    accessorFn: (row) => row.title,
    id: "title",
    cell: (info) => info.getValue(),
    header: "Title",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.entityClass,
    id: "entityClass",
    cell: (info) => info.getValue(),
    header: "Type",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.url,
    id: "url",
    cell: (info: any) => <a href={info.getValue() as string}>Link</a>,
    header: "Link",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.editURL,
    id: "editURL",
    cell: (info: any) => <a href={info.getValue() as string}>Edit</a>,
    header: "Edit",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.state,
    id: "state",
    cell: (info) => info.getValue(),
    header: "State",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.isDraft,
    id: "isDraft",
    cell: (info) => String(info.getValue()),
    header: "Is Draft?",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.wordcount,
    id: "wordcount",
    cell: (info) => info.getValue(),
    header: "Wordcount",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.tags,
    id: "tags",
    cell: (info) => {
      const tagValue = info.getValue();
      const tags = (tagValue || "").toString();

      return (
        <div>
          {tags.split(",").map((tag, index) => (
            <span key={index} className="badge text-bg-secondary">
              {tag}
            </span>
          ))}
        </div>
      );
    },
    header: "Tags",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => {
      if (row.category) {
        return row.category.title; // Use category.title if it's available
      } else if (row.articleParent) {
        return row.articleParent.title; // Use articleParent.title as a fallback
      }
      return ""; // Return an empty string if both category and articleParent are null
    },
    id: "category",
    cell: (info) => {
      const value = info.getValue();
      return value ? value : ""; // Display the value or an empty string
    },
    header: "Category",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.excerpt,
    id: "excerpt",
    cell: (info) => {
      const [expanded, setExpanded] = React.useState(false);

      const toggleExpand = () => {
        setExpanded(!expanded);
      };

      const excerptValue =
        info.getValue() !== null ? String(info.getValue()) : "";
      const isTruncated = !expanded;

      return (
        <div className="excerpt-container">
          <div className={`excerpt-text ${isTruncated ? "text-truncate" : ""}`}>
            {excerptValue}
          </div>
          {excerptValue !== "" && (
            <button onClick={toggleExpand} className="btn btn-secondary">
              {isTruncated ? (
                <FontAwesomeIcon icon={faExpand} />
              ) : (
                <FontAwesomeIcon icon={faCompress} />
              )}
            </button>
          )}
        </div>
      );
    },
    header: "Excerpt",
    footer: (props) => props.column.id,
  },
];

type TableProps<TData> = {
  data: TData[];
  getRowCanExpand: (row: Row<TData>) => boolean;
};

const renderSubComponent = ({ row }: { row: Row<Article> }) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  );
};

export function ArticleTable({
  data,
  getRowCanExpand,
}: TableProps<Article>): JSX.Element {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [useSelectFilter, setUseSelectFilter] = useState(false); // Add state for the checkbox

  const world = useSelector(selectWorld);
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );
  const isDetailed = currentDetailState.isFullDetail;

  let columns = isDetailed ? fullDetailColumns : minDetailColumns;

  const table = useReactTable<Article>({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <BootstrapTable striped hover responsive size="sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? `cursor-pointer select-none col-${header.column.id}`
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <span>
                                {" "}
                                <FontAwesomeIcon icon={faSortUp} />
                              </span>
                            ),
                            desc: (
                              <span>
                                {" "}
                                <FontAwesomeIcon icon={faSortDown} />
                              </span>
                            ),
                            false: (
                              <span>
                                {" "}
                                <FontAwesomeIcon icon={faSort} />
                              </span>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() &&
                          header.column.id === "tags" && (
                            <span>
                              <Form className={"tag-select"}>
                                <Form.Check
                                  type="switch"
                                  id="multiselect-switch"
                                  label="Multiselect"
                                  checked={useSelectFilter}
                                  onChange={() =>
                                    setUseSelectFilter(!useSelectFilter)
                                  }
                                />
                              </Form>
                            </span>
                          )}
                        {header.column.getCanFilter() ? (
                          <div className="col-filter">
                            <Filter
                              column={header.column}
                              table={table}
                              filterType={useSelectFilter}
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <tr>
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className={`cell-${cell.id}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </BootstrapTable>
      <div className="h-2" />
      <div className="row">
        <div className="pagination col-md-3 button-container">
          <button
            className="btn btn-primary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <div className="pagecount col-md">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <span className="input-group widthSmall">
            <span className="input-group-text">Go to page: </span>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="form-control widthSmall"
            />
          </span>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Show {table.getState().pagination.pageSize}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <Dropdown.Item
                  key={pageSize}
                  onClick={() => {
                    table.setPageSize(pageSize);
                  }}
                >
                  Show {pageSize}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
        </div>
      </div>
    </div>
  );
}

interface TagOption {
  label: string;
  value: string;
}

function Filter({
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

  if (column.id === "tags" && filterType) {
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
              console.log(selectedOption);
              const value = selectedOption ? selectedOption.value : undefined;
              column.setFilterValue(
                value === "" ? undefined : value === "true"
              );
            }}
            styles={selectStyles}
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
              console.log(selectedOption);
              const value = selectedOption ? selectedOption.value : undefined;
              column.setFilterValue(value);
            }}
            styles={selectStyles}
          />
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
    const sortedUniqueValues = React.useMemo(getSortedUniqueValues, [
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

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
