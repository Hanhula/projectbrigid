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
  CellContext,
  FilterFn,
} from "@tanstack/react-table";

import { Fragment, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Table as BootstrapTable,
  Pagination,
  Row as BootstrapRow,
  InputGroup,
  Col,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faChevronRight,
  faChevronDown,
  faExpand,
  faCompress,
  faSync,
  faFileEdit,
  faLink,
  faClipboard,
  IconName,
  IconPrefix,
} from "@fortawesome/free-solid-svg-icons";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { Filter } from "./filter";
import { DateTime } from "luxon";

import "react-tagsinput/react-tagsinput.css";
import Link from "next/link";
import EditableCell from "./EditableComponents/editable-cell";
import EditableTags from "./EditableComponents/editable-tags";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import EditableIcons from "./EditableComponents/editable-icons";

// Add all solid icons to the library so you can use it in your components
library.add(fas);

export interface TagOption {
  label: string;
  value: string;
}

export type TableProps<TData> = {
  data: TData[];
  getRowCanExpand: (row: Row<TData>) => boolean;
};

function generateMention(info: CellContext<Article, unknown>) {
  const articleID = info.row.original.id;
  const articleType = info.row.original.entityClass.toLowerCase();
  const articleTitle = info.row.original.title;
  const mention = `@[${articleTitle}](${articleType}:${articleID})`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mention);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button className="copy-block" variant="primary" onClick={copyToClipboard}>
      <FontAwesomeIcon icon={faClipboard} />
    </Button>
  );
}

const renderSubComponent = ({ row }: { row: Row<Article> }) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  );
};

export const csvFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const columnValues = String(row.getValue(columnId)).toLowerCase().split(",");
  const trimmedFilterValue = filterValue.trim().toLowerCase();

  if (trimmedFilterValue.endsWith(",")) {
    const exactSearch = trimmedFilterValue.slice(0, -1);
    return columnValues.includes(exactSearch);
  } else if (trimmedFilterValue.includes(",")) {
    const filters = trimmedFilterValue
      .split(",")
      .map((value: string) => value.trim());
    return filters.every((filter: string) => columnValues.includes(filter));
  } else {
    return columnValues.some((tag) => tag.includes(trimmedFilterValue));
  }
};

export function ArticleTable({
  data,
  getRowCanExpand,
}: TableProps<Article>): JSX.Element {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
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
      id: "copyblock",
      cell: (info: any) => {
        return generateMention(info);
      },
      header: "Block",
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
          <EditableTags
            value={tags}
            onSave={async (newTags) => {
              const paginationState = table.getState().pagination;
              const articleID = info.row.original.id;
              await worldAnvilAPI.updateArticleByField(
                articleID,
                "tags",
                newTags
              );
              table.setPagination(paginationState);
              await worldAnvilAPI.getArticle(articleID, true);
              table.setPagination(paginationState);
            }}
          />
        );
      },
      header: "Tags",
      footer: (props) => props.column.id,
      filterFn: csvFilter,
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
        return formattedDateTime;
      },
      header: "Last Edit",
      footer: (props) => props.column.id,
    },
    {
      id: "Sync",
      cell: (info) => {
        const handleSync = async () => {
          const paginationState = table.getState().pagination;
          const articleID = info.row.original.id;
          await worldAnvilAPI.getArticle(articleID, true);
          table.setPagination(paginationState);
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
      cell: (info) => {
        //const [editing, setEditing] = useState(false);

        const titleValue = String(info.getValue());

        return (
          // <EditableCell
          //   value={titleValue}
          //   onSave={async (newTitle) => {
          //     const paginationState = table.getState().pagination;
          //     const articleID = info.row.original.id;
          //     await worldAnvilAPI.updateArticleByField(
          //       articleID,
          //       "title",
          //       newTitle
          //     );
          //     table.setPagination(paginationState);
          //     await worldAnvilAPI.getArticle(articleID, true);
          //     table.setPagination(paginationState);
          //   }}
          //   editing={editing}
          //   setEditing={setEditing}
          //   isTruncated={false}
          //   isDisabled={true}
          // ></EditableCell>
          <Link href={`/worldanvil/articles/${info.row.original.id}`}>
            {titleValue}
          </Link>
        );
      },
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
    /* Hidden for WorldEmber 2024's Use */
    // {
    //   accessorFn: (row) => {
    //     const wordCount = row.wordcount ? row.wordcount : 0;
    //     if (row.creationDate) {
    //       const inputDateString = row.creationDate.date.substring(
    //         0,
    //         row.creationDate.date.length - 7
    //       );
    //       const creationDate = DateTime.fromFormat(
    //         inputDateString,
    //         "yyyy-MM-dd HH:mm:ss",
    //         { zone: "utc" }
    //       );
    //       const isDec2023 =
    //         creationDate.year === 2023 && creationDate.month === 12;
    //       return wordCount < 50 && isDec2023;
    //     } else {
    //       return false;
    //     }
    //   },
    //   id: "worldEmber",
    //   cell: (info) => {
    //     return info.getValue() ? (
    //       <FontAwesomeIcon icon={faFire} color="red" />
    //     ) : (
    //       <FontAwesomeIcon icon={faX} color="grey" />
    //     );
    //   },
    //   header: "WE Rdy!",
    //   footer: (props) => props.column.id,
    // },
    {
      id: "url",
      accessorFn: (row) => row.url,
      cell: (info: any) => (
        <a href={info.getValue() as string}>
          <Button className="link-url" variant="primary">
            <FontAwesomeIcon icon={faLink} />
          </Button>
        </a>
      ),
      header: "Link",
      footer: (props) => props.column.id,
      enableColumnFilter: false,
    },
    {
      id: "editURL",
      accessorFn: (row) => row.editURL,
      cell: (info: any) => (
        <a href={info.getValue() as string}>
          <Button className="edit-url" variant="primary">
            <FontAwesomeIcon icon={faFileEdit} />
          </Button>
        </a>
      ),
      header: "Edit",
      footer: (props) => props.column.id,
      enableColumnFilter: false,
    },
    {
      id: "copyblock",
      cell: (info: any) => {
        return generateMention(info);
      },
      header: "Copy Block",
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
      accessorFn: (row) => row.isWip,
      id: "isWip",
      cell: (info) => String(info.getValue()),
      header: "Is WIP?",
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
          <EditableTags
            value={tags}
            onSave={async (newTags) => {
              const paginationState = table.getState().pagination;
              const articleID = info.row.original.id;
              await worldAnvilAPI.updateArticleByField(
                articleID,
                "tags",
                newTags
              );
              table.setPagination(paginationState);
              await worldAnvilAPI.getArticle(articleID, true);
              table.setPagination(paginationState);
            }}
          />
        );
      },
      header: "Tags",
      footer: (props) => props.column.id,
      filterFn: csvFilter,
    },
    {
      accessorFn: (row) => row.icon,
      id: "icon",
      cell: (info) => {
        const value = info.getValue() !== null ? String(info.getValue()) : "";
        const [editing, setEditing] = useState(false);
        if (value !== "") {
          return (
            <div className="icon-container">
              <EditableIcons
                value={value}
                onSave={async (newIcon) => {
                  const paginationState = table.getState().pagination;
                  const articleID = info.row.original.id;
                  await worldAnvilAPI.updateArticleByField(
                    articleID,
                    "icon",
                    newIcon
                  );
                  table.setPagination(paginationState);
                  await worldAnvilAPI.getArticle(articleID, true);
                  table.setPagination(paginationState);
                }}
                editing={editing}
                setEditing={setEditing}
              ></EditableIcons>
            </div>
          );
        }
        return "";
      },
      header: "Icon",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => {
        if (row.category) {
          return row.category.title;
        } else if (row.articleParent) {
          return row.articleParent.title;
        }
        return "";
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
        const [expanded, setExpanded] = useState(false);
        const [editing, setEditing] = useState(false);

        const toggleExpand = () => {
          setExpanded(!expanded);
        };

        const excerptValue =
          info.getValue() !== null ? String(info.getValue()) : "";
        const isTruncated = !expanded;

        return (
          <div className="excerpt-container">
            <EditableCell
              value={excerptValue}
              onSave={async (newExcerpt) => {
                const paginationState = table.getState().pagination;
                const articleID = info.row.original.id;
                await worldAnvilAPI.updateArticleByField(
                  articleID,
                  "excerpt",
                  newExcerpt
                );
                table.setPagination(paginationState);
                await worldAnvilAPI.getArticle(articleID, true);
                table.setPagination(paginationState);
              }}
              editing={editing}
              setEditing={setEditing}
              isTruncated={isTruncated}
            ></EditableCell>
            {!editing && excerptValue !== "" && (
              <Button onClick={toggleExpand} variant="secondary">
                {isTruncated ? (
                  <FontAwesomeIcon icon={faExpand} />
                ) : (
                  <FontAwesomeIcon icon={faCompress} />
                )}
              </Button>
            )}
          </div>
        );
      },
      header: "Excerpt",
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
      accessorFn: (row) => row.views,
      id: "views",
      cell: (info) => info.getValue(),
      header: "Views",
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
        return formattedDateTime;
      },
      header: "Last Edit",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => (row.creationDate ? row.creationDate.date : ""),
      id: "createdDate",
      cell: (info) => {
        if (info.getValue() === "") {
          return "";
        } else {
          const dateString = String(info.getValue());
          const inputDateString = dateString.substring(
            0,
            dateString.length - 7
          );
          const dateTime = DateTime.fromFormat(
            inputDateString,
            "yyyy-MM-dd HH:mm:ss",
            { zone: "utc" }
          );
          const localDateTime = dateTime.toLocal();
          const formattedDateTime = localDateTime.toFormat(
            "yyyy-MM-dd 'at' HH:mm:ss"
          );
          return formattedDateTime;
        }
      },
      header: "Created On",
      footer: (props) => props.column.id,
    },
    {
      id: "Sync",
      cell: (info) => {
        const handleSync = async () => {
          const paginationState = table.getState().pagination;
          const articleID = info.row.original.id;
          await worldAnvilAPI.getArticle(articleID, true);
          table.setPagination(paginationState);
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
    filterFns: {
      csv: csvFilter,
    },
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
      <BootstrapRow className="pagination-container">
        <Col md={4}>
          <Pagination>
            <Pagination.First
              onClick={() => table.setPageIndex(0)}
              disabled={table.getState().pagination.pageIndex === 0}
            />
            <Pagination.Prev
              onClick={() => table.previousPage()}
              disabled={table.getState().pagination.pageIndex === 0}
            />

            {/* Show the two pages before the current page */}
            {table.getState().pagination.pageIndex > 1 && (
              <Pagination.Item
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex - 2)
                }
              >
                {table.getState().pagination.pageIndex - 1}
              </Pagination.Item>
            )}
            {table.getState().pagination.pageIndex > 0 && (
              <Pagination.Item
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex - 1)
                }
              >
                {table.getState().pagination.pageIndex}
              </Pagination.Item>
            )}

            {/* Show the current page */}
            <Pagination.Item active>
              {table.getState().pagination.pageIndex + 1}
            </Pagination.Item>

            {/* Show the two pages after the current page */}
            {table.getState().pagination.pageIndex <
              table.getPageCount() - 2 && (
              <Pagination.Item
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex + 1)
                }
              >
                {table.getState().pagination.pageIndex + 2}
              </Pagination.Item>
            )}
            {table.getState().pagination.pageIndex <
              table.getPageCount() - 3 && (
              <Pagination.Item
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex + 2)
                }
              >
                {table.getState().pagination.pageIndex + 3}
              </Pagination.Item>
            )}

            <Pagination.Next
              onClick={() => table.nextPage()}
              disabled={
                table.getState().pagination.pageIndex ===
                table.getPageCount() - 1
              }
            />
            <Pagination.Last
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={
                table.getState().pagination.pageIndex ===
                table.getPageCount() - 1
              }
            />
          </Pagination>
        </Col>
        <Col md={1}>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={2}>
          <InputGroup>
            <InputGroup.Text id="basic-addon2">Go to page:</InputGroup.Text>
            <Form.Control
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </InputGroup>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
        </Col>
        <Col md={1}>
          <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
        </Col>
      </BootstrapRow>
    </div>
  );
}
