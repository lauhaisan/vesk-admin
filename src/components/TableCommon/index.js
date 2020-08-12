import React from "react";
import "./index.scss";
import { DataTable } from "carbon-components-react";
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader
} = DataTable;

class TableSelect extends React.Component {
  renderAction = item => {
    const { actionReview, actionEdit, actionDelete } = this.props;
    return (
      <div className="viewAction">
        <i
          className="fas fa-eye viewAction__icon viewAction__icon--review"
          onClick={() => actionReview(item)}
        ></i>
        <i
          className="fas fa-trash-alt viewAction__icon viewAction__icon--delete"
          onClick={() => actionDelete(item)}
        ></i>
        <i
          className="fas fa-edit viewAction__icon viewAction__icon--edit"
          onClick={() => actionEdit(item)}
        ></i>
      </div>
    );
  };

  render() {
    const { rowData, headerData, title } = this.props;

    return (
      <div className="tableCommon">
        <DataTable
          rows={rowData}
          headers={headerData}
          render={({ rows, headers, getHeaderProps }) => (
            <TableContainer title={title}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>
                          {cell.info.header === "action"
                            ? this.renderAction(row)
                            : cell.value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      </div>
    );
  }
}
export default TableSelect;
