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
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Filter } from "./filter";

export interface TagOption {
  label: string;
  value: string;
}

export type TableProps<TData> = {
  data: TData[];
  getRowCanExpand: (row: Row<TData>) => boolean;
};

function EditableCell({
  value: initialValue,
  onSave,
  onCancel,
}: {
  value: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = React.useState(initialValue);

  const handleSave = () => {
    onSave(value);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="cell-editing">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button className="btn btn-success cell-save" onClick={handleSave}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button className="btn btn-danger cell-cancel" onClick={handleCancel}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

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
  const worldAnvilAPI = useWorldAnvilAPI();

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

        const [editing, setEditing] = React.useState(false);

        const handleEdit = () => {
          setEditing(true);
        };

        const handleSaveTags = (newTags: string) => {
          const articleID = info.row.original.id;
          worldAnvilAPI.updateArticleByField(articleID, "tags", newTags);
          setEditing(false);
        };

        return editing ? (
          <EditableCell
            value={tags}
            onSave={handleSaveTags}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div>
            {tags.split(",").map((tag, index) => (
              <span key={index} className="badge text-bg-secondary">
                {tag}
              </span>
            ))}
            <button className="btn btn-primary cell-edit" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        );
      },
      header: "Tags",
      footer: (props) => props.column.id,
    },
  ];

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
