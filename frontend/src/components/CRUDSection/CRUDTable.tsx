import React from "react";
import { HeaderTable } from "@/types/components/types.t";
import { EditIcon, DeleteIcon } from "@/assets/icons";
type CRUDTableProps<T> = {
  headers: HeaderTable[];
  elements: T[];
  openDeleteModal: (element: T) => void;
  openEditModal: (element: T) => void;
};

function CRUDTable<T extends Record<string, any>>({
  headers,
  elements,
  openDeleteModal,
  openEditModal,
}: CRUDTableProps<T>) {
  return (
    <table className="table-auto ">
      <thead>
        <tr>
          {headers.map((header) => (
            <th className="p-3" key={header.value}>
              {header.label}
            </th>
          ))}
          <th className="p-3">Acciones</th>
        </tr>
      </thead>

      <tbody> 
        
      {elements && elements.map((element, index) => (
                  <tr key={index} className="border-t-2 p-2">
            {headers.map((header) => {
              switch (header.type) {
                case "date":
                  const dateAsDate = new Date(
                    element[header.value].slice(0, 10),
                  );
                  dateAsDate.setSeconds(dateAsDate.getSeconds() + 1);
                  console.log(dateAsDate.getUTCDate(), element[header.value]);
                  return (
                    <td className="p-2 text-center" key={header.value}>
                      {dateAsDate.getUTCDate()}/{dateAsDate.getUTCMonth() + 1}/
                      {dateAsDate.getUTCFullYear()}
                    </td>
                  );
                case "string":
                  return (
                    <td className="p-2 text-center" key={header.value}>
                      {element[header.value]}
                    </td>
                  );
                default:
                  break;
              }
            })}
            <td className="flex flex-row items-center justify-center space-x-2">
              <button
                onClick={() => openEditModal(element)}
                className="hover:text-primary-color-dark text-primary-color"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => openDeleteModal(element)}
                className="text-red-600 hover:text-red-800"
              >
                <DeleteIcon  color="#DD331D"/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CRUDTable;