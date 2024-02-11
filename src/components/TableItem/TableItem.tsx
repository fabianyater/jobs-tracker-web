import { TableCell } from "flowbite-react";
import React, { ReactNode } from "react";

export type TableItemProps = {
  children: ReactNode;
};

const TableItem: React.FC<TableItemProps> = ({ children }) => {
  return (
    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      {children}
    </TableCell>
  );
};

export default TableItem;
