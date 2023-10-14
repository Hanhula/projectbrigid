import * as React from "react";
import { Article } from "@/components/types/article";

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
import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const columns: ColumnDef<Article>[] = [
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

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
      <table className="table table-dark table-striped">
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
                              ? "cursor-pointer select-none"
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
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
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
                      <td key={cell.id}>
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
      </table>
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

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
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

  if (column.id === "isDraft") {
    return (
      <div>
        <div className="input-group">
          <DebouncedInput
            type="text" // Treat it as text input for boolean values
            value={columnFilterValue ? columnFilterValue.toString() : ""}
            onChange={(value) => {
              // Convert the value to a boolean
              const isDraftFilter = (value as string).toLowerCase() === "true";
              column.setFilterValue(isDraftFilter);
            }}
            placeholder={`Search... (true/false)`}
            className="form-control"
          />
        </div>
        <div className="h-1" />
      </div>
    );
  } else {
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
