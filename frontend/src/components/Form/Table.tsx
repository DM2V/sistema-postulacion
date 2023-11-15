import { TableProps } from "@/types/components/types.t";

const Table: React.FC<TableProps> = ({ columns, rows }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200 border-t border-gray-400">
              {columns.map((column, index) => (
                <th key={index} className="p-2 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowData, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-400">
                {rowData.map((data, dataIndex) => (
                  <td key={dataIndex} className="p-2">{data}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;