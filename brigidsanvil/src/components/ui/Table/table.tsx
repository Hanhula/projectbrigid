import * as React from "react";
import { Article } from "@/components/types/article";

import { selectCurrentDetailStateByWorld } from "@/components/store/articlesSlice";
import { useSelector } from "react-redux";
import { selectWorld } from "@/components/store/apiSlice";

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
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Table as BootstrapTable,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faChevronRight,
  faChevronDown,
  faCheck,
  faXmark,
  faExpand,
  faCompress,
  faSync,
  faFileEdit,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Filter } from "./filter";
import { TagsInput } from "react-tag-input-component";
import { DateTime } from "luxon";

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
  onSave: (newValues: string) => void;
  onCancel: () => void;
}) {
  const [tags, setTags] = React.useState(
    initialValue.split(",").filter((tag) => tag.trim() !== "")
  );

  const handleSave = () => {
    const newTagsString = tags.join(",");
    onSave(newTagsString);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="cell-editing">
      <div className="input-group">
        <TagsInput
          value={tags}
          onChange={setTags}
          name="tags"
          placeHolder="Enter tags"
          separators={[","]}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className="cell-edit-buttons">
        <button className="btn btn-success cell-save" onClick={handleSave}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button className="btn btn-danger cell-cancel" onClick={handleCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
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

  let minDetailColumns: ColumnDef<Article>[] = [
    {
      id: "expander",
      header: "",
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
      cell: (info: any) => (
        <a href={info.getValue() as string}>
          <Button className="link-url" variant="primary">
            <FontAwesomeIcon icon={faLink} />
          </Button>
        </a>
      ),
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

        const handleSaveTags = async (newTags: string) => {
          const articleID = info.row.original.id;
          await worldAnvilAPI.updateArticleByField(articleID, "tags", newTags);
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
            <Button
              variant="primary"
              className="cell-edit"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </div>
        );
      },
      header: "Tags",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.updateDate.date,
      id: "date",
      cell: (info) => {
        const dateString = String(info.getValue());
        const inputDateString = dateString.substring(0, dateString.length - 7);
        const dateTime = DateTime.fromFormat(
          inputDateString,
          "yyyy-MM-dd HH:mm:ss",
          { zone: "utc" }
        );
        const localDateTime = dateTime.toLocal();
        const formattedDateTime = localDateTime.toFormat(
          "yyyy-MM-dd 'at' HH:mm:ss"
        );
        console.log(formattedDateTime);
        return formattedDateTime;
      },
      header: "Updated At",
      footer: (props) => props.column.id,
    },
    {
      id: "Sync",
      cell: (info) => {
        const handleSync = () => {
          const articleID = info.row.original.id;
          worldAnvilAPI.getArticle(articleID, true);
        };

        return (
          <Button variant="primary" className="cell-sync" onClick={handleSync}>
            <FontAwesomeIcon icon={faSync} />
          </Button>
        );
      },
      header: "Sync",
      footer: (props) => props.column.id,
    },
  ];

  let fullDetailColumns: ColumnDef<Article>[] = [
    {
      id: "expander",
      header: "",
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
      cell: (info: any) => (
        <a href={info.getValue() as string}>
          <Button className="link-url" variant="primary">
            <FontAwesomeIcon icon={faLink} />
          </Button>
        </a>
      ),
      header: "Link",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.editURL,
      id: "editURL",
      cell: (info: any) => (
        <a href={info.getValue() as string}>
          <Button className="edit-url" variant="primary">
            <FontAwesomeIcon icon={faFileEdit} />
          </Button>
        </a>
      ),
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
      accessorFn: (row) => row.likes,
      id: "likes",
      cell: (info) => info.getValue(),
      header: "Likes",
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

        const handleSaveTags = async (newTags: string) => {
          const articleID = info.row.original.id;
          await worldAnvilAPI.updateArticleByField(articleID, "tags", newTags);
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
        return value ? value : "";
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
            <div
              className={`excerpt-text ${isTruncated ? "text-truncate" : ""}`}
            >
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
    {
      accessorFn: (row) => row.updateDate.date,
      id: "date",
      cell: (info) => {
        const dateString = String(info.getValue());
        const inputDateString = dateString.substring(0, dateString.length - 7);
        const dateTime = DateTime.fromFormat(
          inputDateString,
          "yyyy-MM-dd HH:mm:ss",
          { zone: "utc" }
        );
        const localDateTime = dateTime.toLocal();
        const formattedDateTime = localDateTime.toFormat(
          "yyyy-MM-dd 'at' HH:mm:ss"
        );
        console.log(formattedDateTime);
        return formattedDateTime;
      },
      header: "Updated At",
      footer: (props) => props.column.id,
    },
    {
      id: "Sync",
      cell: (info) => {
        const handleSync = () => {
          const articleID = info.row.original.id;
          worldAnvilAPI.getArticle(articleID, true);
        };

        return (
          <Button variant="primary" className="cell-sync" onClick={handleSync}>
            <FontAwesomeIcon icon={faSync} />
          </Button>
        );
      },
      header: "Sync",
      footer: (props) => props.column.id,
    },
  ];

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
                        {header.column.getCanSort() ? (
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
                        ) : (
                          <div>
                            {header.column.columnDef.header
                              ? header.column.columnDef.header?.toString()
                              : ""}
                          </div>
                        )}

                        {header.column.getCanFilter() &&
                          header.column.id === "tags" && (
                            <span>
                              <Form className={"tag-select"}>
                                <Form.Check
                                  type="switch"
                                  id="multiselect-switch"
                                  label="Multi"
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
                      <td key={cell.id} className={`cell-${cell.column.id}`}>
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
