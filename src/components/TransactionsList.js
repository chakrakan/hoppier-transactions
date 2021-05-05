import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { useTable } from 'react-table';

const TableWrapper = styled.div`
  clear: left;
  float: left;
  max-width: 700px;
`;
const StyledTable = styled.table`
  margin: 0 0 0 140px;
  width: 100%;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  display: table;
  @media screen and (max-width: 580px) {
    display: block;
  }
`;
const StyledHeaderContent = styled.thead``;
const StyledHeader = styled.th`
  padding: 6px;
  border: 1px solid #ccc;
  text-align: center;
`;
const StyledRow = styled.tr`
  display: table-row;
  background: #f6f6f6;

  .header {
    font-weight: 900;
    color: #f6f6f6;
    background: #27ae60;
  }

  :nth-of-type(odd) {
    background: #e9e9e9;
  }
`;
const StyledTableBody = styled.tbody`
  margin-top: 0px;

  height: 80px;
  overflow-x: auto;
`;
const Cell = styled.td`
  text-align: center;
`;

export const TransactionList = (props) => {
  const { userTransactions, defaultCurrency } = props;
  const data = useMemo(() => userTransactions, [userTransactions]);
  const columns = useMemo(
    () => [
      {
        Header: 'Transaction',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Amount',
            accessor: defaultCurrency === 'CAD' ? 'cadAmount' : 'usdAmount',
          },
        ],
      },
      {
        Header: 'Merchant',
        columns: [
          {
            Header: 'Name',
            accessor: 'merchant',
          },
          {
            Header: 'ID',
            accessor: 'merchantNetworkId',
          },
        ],
      },
    ],
    [defaultCurrency]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <TableWrapper>
      <StyledTable {...getTableProps()}>
        <StyledHeaderContent>
          {headerGroups.map((headerGroup) => (
            <StyledRow
              className='header'
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <StyledHeader {...column.getHeaderProps()}>
                  {column.render('Header')}
                </StyledHeader>
              ))}
            </StyledRow>
          ))}
        </StyledHeaderContent>
        <StyledTableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <StyledRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                  );
                })}
              </StyledRow>
            );
          })}
        </StyledTableBody>
      </StyledTable>
    </TableWrapper>
  );
};
