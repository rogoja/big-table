import { useContext, useMemo } from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import clsx from 'clsx';

import SchoolBoysContext from 'context/SchoolBoysContext';

import CellButton from './CellButton/CellButton';
import s from './styles.module.scss';

type columnT = {
  [key: string]: string | number;
  number: number;
  fullName: string;
}

const columnHelper = createColumnHelper<columnT>();

const TableOfVisits = () => {
  const {
    column,
    rate,
    schoolBoys,
    toggleRate,
  } = useContext(SchoolBoysContext);

  const columns = useMemo(() => ([
    columnHelper.accessor('number', {
      header: '№',
      meta: {
        sticky: true,
      },
      maxSize: 50,
    }),
    columnHelper.accessor('fullName', {
      header: 'Учень',
      meta: {
        sticky: true,
        textAlign: 'left',
      },
    }),
    ...column.map((item) => columnHelper.accessor(item.Id.toString(), {
      header: item.Title,
      cell: (info) => (rate[info.cell.id]?.Title ? 'Н' : ''),
      maxSize: 50,
    })),
  ]), [column, rate]);

  const data = useMemo(() => ([
    ...schoolBoys.map((schoolBoy, index) => ({
      number: index + 1,
      fullName: `${schoolBoy.FirstName || ''} ${schoolBoy.SecondName || ''} ${schoolBoy.LastName || ''}`,
      id: schoolBoy.Id,
    })),
  ]), [schoolBoys]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => String(originalRow.id),
    state: {
      columnPinning: { left: ['number', 'fullName'] },
    },
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
  });

  return (
    <MuiTable className={s.table}>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className={s.tableHeaderRow} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell
                className={clsx(s.tableCell, {
                  [s.sticky]: header.column.getIsPinned(),
                })}
                key={header.id}
                style={{
                  left: header.column.getIsPinned() ? header.column.getStart() : 0,
                  width: header.getSize(),
                }}
              >
                <div>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow className={s.tableRow} key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <TableCell
                className={clsx(s.tableCell, {
                  [s.sticky]: cell.column.getIsPinned(),
                  [s.interactive]: index >= 2,
                })}
                style={{
                  left: cell.column.getIsPinned() ? cell.column.getStart() : 0,
                  width: cell.column.getSize(),
                  textAlign: cell.column.columnDef.meta?.textAlign || 'center',
                }}
                key={cell.id}
              >
                {
                  index >= 2 ? (
                    <CellButton
                      onClick={(isRate) => toggleRate(cell.row.original.id, cell.column.id, isRate)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </CellButton>
                  ) : <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
};

export default TableOfVisits;
