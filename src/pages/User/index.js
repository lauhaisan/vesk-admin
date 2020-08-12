import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import { DataTable } from "carbon-components-react";
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  // TableExpandHeader,
  // TableExpandRow,
  // TableExpandedRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  // TableToolbarSearch,
  // TableToolbarContent,
  // TableToolbarMenu,
  // TableToolbarAction,
} = DataTable;

class Users extends React.Component {
  batchActionClick = (row) => {
    console.log("row", row);
  };

  render() {
    // const { history } = this.props;
    const headerData = [
      {
        header: "Name",
        key: "name",
      },
      {
        header: "Protocol",
        key: "protocol",
      },
      {
        header: "Port",
        key: "port",
      },
      {
        header: "Rule",
        key: "rule",
      },
      {
        header: "Attached Groups",
        key: "attached_groups",
      },
      {
        header: "Status",
        key: "status",
      },
    ];
    const rowData = [
      {
        attached_groups: "Kevins VM Groups",
        id: "a",
        name: "Load Balancer 3",
        port: 3000,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Disabled",
      },
      {
        attached_groups: "Maureens VM Groups",
        id: "b",
        name: "Load Balancer 1",
        port: 443,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Starting",
      },
      {
        attached_groups: "Andrews VM Groups",
        id: "c",
        name: "Load Balancer 2",
        port: 80,
        protocol: "HTTP",
        rule: "DNS delegation",
        status: "Active",
      },
      {
        attached_groups: "Marcs VM Groups",
        id: "d",
        name: "Load Balancer 6",
        port: 3000,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Disabled",
      },
      {
        attached_groups: "Mels VM Groups",
        id: "e",
        name: "Load Balancer 4",
        port: 443,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Starting",
      },
      {
        attached_groups: "Ronjas VM Groups",
        id: "f",
        name: "Load Balancer 5",
        port: 80,
        protocol: "HTTP",
        rule: "DNS delegation",
        status: "Active",
      },
    ];

    return (
      <Fragment>
        <TitlePage title="Users" />
        <div
          style={{
            backgroundColor: "#fff",
            width: "76%",
            height: "200vh",
            cursor: "pointer",
            marginTop: "20px",
          }}
          // onClick={() => history.push("/users/1")}
        >
          <DataTable
            isSortable
            rows={rowData}
            headers={headerData}
            render={({
              rows,
              headers,
              getHeaderProps,
              getSelectionProps,
              getBatchActionProps,
              // onInputChange,
              selectedRows,
            }) => (
              <TableContainer title="DataTable with batch actions">
                <TableToolbar>
                  <TableBatchActions {...getBatchActionProps()}>
                    <TableBatchAction
                      primaryFocus
                      onClick={() => this.batchActionClick(selectedRows)}
                    >
                      Ghost
                    </TableBatchAction>
                    {/* <TableBatchAction
                      onClick={this.batchActionClick(selectedRows)}
                    >
                      Ghost
                    </TableBatchAction>
                    <TableBatchAction
                      onClick={this.batchActionClick(selectedRows)}
                    >
                      Ghost
                    </TableBatchAction> */}
                  </TableBatchActions>
                  {/* <TableToolbarSearch onChange={onInputChange} /> */}
                  {/* <TableToolbarContent>
                    <TableToolbarMenu>
                      <TableToolbarAction
                        icon={iconDownload}
                        iconDescription="Download"
                        onClick={action("TableToolbarAction - Download")}
                      />
                      <TableToolbarAction
                        icon={iconEdit}
                        iconDescription="Edit"
                        onClick={action("TableToolbarAction - Edit")}
                      />
                      <TableToolbarAction
                        icon={iconSettings}
                        iconDescription="Settings"
                        onClick={action("TableToolbarAction - Settings")}
                      />
                    </TableToolbarMenu>
                    <Button
                      onClick={() => alert("Open Popup Filter")}
                      small
                      kind="primary"
                    >
                      Filter
                    </Button>
                  </TableToolbarContent> */}
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={() => console.log("onRow", row)}
                      >
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          />
        </div>
      </Fragment>
    );
  }
}
export default Users;
