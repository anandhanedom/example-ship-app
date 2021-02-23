import React from "react";
import PropTypes from "prop-types";

// Bootstrap
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pagination from "react-bootstrap/Pagination";
import Popover from "react-bootstrap/Popover";

import Select from "react-select";

import "../../pages/ShipmentsListPage/DataTable.scss";

const formatCurrency = (value, locale = "en-IN", currency = "INR") =>
  value.toLocaleString(locale, {
    style: "currency",
    currency,
  });

function DataTable(props) {
  const {
    data = [],
    columns = [],
    pagination = {},
    options = {},
    busy = false,
    headerOptions = {},
    search = {},
    sort = {},
    ordering = {
      //column title
      onChange: () => {},
    },
    actions,
    showDownload,
    classes,
    showTotalRow = false,
    // serverSide = true
  } = props;

  const {
    page = 0,
    rowsPerPage = 10,
    rowsPerPageOptions = [],
    total = 1000,
    block = false,
    showPages = true,
  } = pagination;
  const { customHeader, title } = headerOptions;
  // optional custom header function
  const { customRowRender } = options;
  // Optional custom render function

  const showColumns = columns.filter(
    column => !column.options || column.options.display !== false
  ); // Columns to be shown

  const lastPageIndex = ~~((total - 1) / rowsPerPage);
  const isLastPage = (+page + 1) * rowsPerPage >= total;

  const customStyles = {
    container: styles => ({
      ...styles,
      width: "80px",
      height: "38px",
      margin: "0px 6px",
    }),
    control: styles => ({
      ...styles,
      height: "38px",
      borderColor: "#dbdbdb",
    }),
    menu: styles => ({ ...styles, width: "80px", zIndex: "1000" }),
    menuList: styles => ({ ...styles, width: "80px", zIndex: "1000" }),
    option: (styles, state) => ({
      ...styles,
      background: state.isSelected
        ? "#439fd9"
        : state.isFocused
        ? "#c7e9ff"
        : "#FFFFFF",
    }),
  };

  const isDesc = ordering.order === "desc";

  const popover = (columnName, helpText) => (
    <Popover id="popover-basic">
      <Popover.Title>{columnName}</Popover.Title>
      <Popover.Content>{helpText}</Popover.Content>
    </Popover>
  );

  return (
    <Container>
      <Row>
        {title ? (
          <h1>{title}</h1>
        ) : (
          customHeader || (
            <>
              {search.enable && <Form.Control value={search.text} />}
              {sort.enable && <i className="fas fa-sort-down"></i>}
            </>
          )
        )}
      </Row>

      {
        <Table bordered hover responsive="md" size="sm" className={classes}>
          <thead>
            <tr>
              {showColumns.map((column, i) => (
                <th
                  style={{
                    padding: "10px",
                    cursor: column.isNotOrderable ? "" : "pointer",
                  }}
                  key={column.name}
                  onClick={e => {
                    !column.isNotOrderable &&
                      ordering &&
                      ordering.onChange({
                        column: column.name,
                      });
                  }}>
                  {column.label}
                  {column.name === ordering.column && (
                    <i
                      onClick={e => {
                        e.stopPropagation();
                        ordering.onChange({
                          order: isDesc ? "asc" : "desc",
                        });
                      }}
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      className={`fas fa-sort-${isDesc ? "down" : "up"}`}></i>
                  )}
                  {column.helpText && (
                    <OverlayTrigger
                      delay={{ show: 250 }}
                      overlay={popover(column.label, column.helpText)}>
                      <i className="far fa-question-circle"></i>
                    </OverlayTrigger>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {busy ? (
              <tr className="table-body-row">
                <td colSpan={6}>Waiting</td>
              </tr>
            ) : data.length === 0 ? (
              <tr className="table-body-row">
                <td
                  align="center"
                  colSpan={showColumns.length}
                  style={{ border: "1px solid #ebebeb" }}>
                  No data
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                return customRowRender ? (
                  customRowRender(row, i)
                ) : (
                  <tr
                    className="table-body-row"
                    style={{
                      ...(props.onRowClick ? { cursor: "pointer" } : {}),
                    }}
                    key={`row-${i}`}
                    onClick={() => {
                      if (props.onRowClick) props.onRowClick(row, i);
                    }}>
                    {showColumns.map((column, i) => (
                      <td
                        key={i}
                        style={{
                          ...(column.cellBg
                            ? { backgroundColor: column.cellBg(row) }
                            : {}),
                        }}
                        align={
                          (column.options && column.options.align) ||
                          typeof row[column.name] === "number"
                            ? "right"
                            : "center"
                        }>
                        {column.customCellRender
                          ? column.customCellRender(row)
                          : typeof row[column.name] === "object"
                          ? ""
                          : row[column.name]}
                      </td>
                    ))}
                    {actions &&
                      actions.map(action => (
                        <i
                          key={action.name}
                          style={{ margin: "0px 5px" }}
                          className={action.icon}
                          onClick={e => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}></i>
                      ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      }
      {!block && (
        <Row className="data-table-pagination d-flex justify-content-between align-items-center">
          <span>
            {total === 0
              ? "  "
              : `Showing ${rowsPerPage * page + 1}-${
                  rowsPerPage * (page + 1) > total
                    ? total
                    : rowsPerPage * (page + 1)
                }
            of ${total}`}
          </span>
          <span>
            {
              // To implement download
              showDownload && (
                <Button
                  variant="outline-secondary"
                  style={{ margin: "0px 15px" }}
                  disabled>
                  <i className="fas fa-download"></i>
                </Button>
              )
            }
            <Button
              variant="outline-primary"
              style={{ margin: "0px 15px" }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `${showColumns
                    .map(column => column.label)
                    .join(",")}\n${data
                    .map(row =>
                      showColumns
                        .map(column =>
                          column.copy
                            ? row[column.name]
                            : typeof row[column.name] === "number"
                            ? row[column.name]
                            : column.customCellRender && column.copyAsCustom
                            ? column.customCellRender(row)
                            : typeof row[column.name] === "object"
                            ? ""
                            : row[column.name] || ""
                        )
                        .join(",")
                    )
                    .join(`\n`)}`
                );
              }}>
              <i className="far fa-copy"></i>
            </Button>
          </span>
          <span>
            <Pagination>
              <Select
                styles={customStyles}
                value={{ value: rowsPerPage, label: rowsPerPage }}
                className="dropdown client-selector"
                options={rowsPerPageOptions.map(option => ({
                  value: option,
                  label: option,
                }))}
                onChange={e => {
                  pagination.onChange({ rowsPerPage: e.value, page: 0 });
                }}
              />
              <Pagination.First
                disabled={page === 0}
                onClick={() => {
                  pagination.onChange({ page: 0 });
                }}
              />
              <Pagination.Prev
                disabled={page === 0}
                onClick={() => {
                  pagination.onChange({ page: page - 1 });
                }}
              />

              {/* first X, + or - Y, and last X */}
              {page > 1 && (
                <Pagination.Item
                  onClick={() => {
                    pagination.onChange({ page: page - 2 });
                  }}>
                  {page - 1}
                </Pagination.Item>
              )}
              {page > 0 && (
                <Pagination.Item
                  onClick={() => {
                    pagination.onChange({ page: page - 1 });
                  }}>
                  {page}
                </Pagination.Item>
              )}

              <Pagination.Item active>{page + 1}</Pagination.Item>

              {lastPageIndex - page > 0 && (
                <Pagination.Item
                  onClick={() => {
                    pagination.onChange({ page: page + 1 });
                  }}>
                  {page + 2}
                </Pagination.Item>
              )}
              {lastPageIndex - page > 1 && (
                <Pagination.Item
                  onClick={() => {
                    pagination.onChange({ page: page + 2 });
                  }}>
                  {page + 3}
                </Pagination.Item>
              )}
              <Pagination.Next
                disabled={isLastPage}
                onClick={() => {
                  pagination.onChange({ page: page + 1 });
                }}
              />
              <Pagination.Last
                disabled={isLastPage}
                onClick={() => {
                  pagination.onChange({ page: lastPageIndex });
                }}
              />
            </Pagination>
          </span>
        </Row>
      )}
    </Container>
  );
}

DataTable.propTypes = {
  /**
   * Data to be rendered in the table
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Column metadata
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      options: PropTypes.shape({
        display: PropTypes.bool,
        align: PropTypes.oneOf(["right", "left", "center"]),
        showTotal: PropTypes.bool,
      }),
      helpText: PropTypes.string,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    total: PropTypes.number,
    block: PropTypes.bool,
    showPages: PropTypes.bool,
  }),
  options: PropTypes.shape({
    customRowRender: PropTypes.func,
  }),
  busy: PropTypes.bool,
  headerOptions: PropTypes.shape({
    customHeader: PropTypes.node,
    title: PropTypes.string,
  }),
  search: PropTypes.shape({
    enable: PropTypes.bool,
    text: PropTypes.string,
  }),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object,
      onClick: PropTypes.func,
    })
  ),
  showTotalRow: PropTypes.bool,
  showDownload: PropTypes.bool,
  ordering: PropTypes.shape({
    column: PropTypes.string,
    order: PropTypes.oneOf(["desc", "asc"]),
    onChange: PropTypes.func,
  }),

  /*
    ordering = {},
    classes*/
};

export default DataTable;
