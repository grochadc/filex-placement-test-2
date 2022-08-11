import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    Column,
    Table
} from "@tanstack/react-table";

type Applicant = {
    id: number,
    codigo: string,
    nombre: string
    apellidoMaterno: string
    apellidoPaterno: string
    meetLink: string
    nivelEscrito: number
    nivelOral?: number
    nivelFinal?: number
    submit?: any
}

const defaultData: Applicant[] = [
    {
        id: 1,
        codigo: "1234567890",
        nombre: "Benito Antonio",
        apellidoPaterno: "Martinez",
        apellidoMaterno: "Ocasio",
        meetLink: "meetLink1",
        nivelEscrito: 4,
        nivelOral: undefined,
        nivelFinal: undefined
    },
    {
        id: 2,
        codigo: "0987654321",
        nombre: "Alberto",
        apellidoPaterno: "Aguilera",
        apellidoMaterno: "Valadez",
        meetLink: "meetLink2",
        nivelEscrito: 3,
        nivelOral: undefined,
        nivelFinal: undefined
    },
    {
        id: 3,
        codigo: "1234509876",
        nombre: "Pedro",
        apellidoPaterno: "Paramo",
        apellidoMaterno: "Paramo",
        meetLink: "meetLink1",
        nivelEscrito: 4,
        nivelOral: 4,
        nivelFinal: 4
    }
];

const columnHelper = createColumnHelper<Applicant>();

const columns = [
    columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("codigo", {
        header: "Codigo",
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("nombre", {
        header: () => <>Nombre</>,
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("apellidoPaterno", {
        header: () => <>Apellido Paterno</>,
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("apellidoMaterno", {
        header: () => <>Apellido Paterno</>,
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("meetLink", {
        header: () => <>Meet Link</>,
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("nivelEscrito", {
        header: () => <>Escrito</>,
        cell: (info) => <>{info.getValue()}</>,
    }),
    columnHelper.accessor("nivelOral", {
        header: () => <>Oral</>,
        cell: (info) => <input type="number" min="0" max="7" value={info.getValue()} />,
    }),
    columnHelper.accessor("nivelFinal", {
        header: () => <>Final</>,
        cell: (info) => <input type="number" min="0" max="7" value={info.getValue()} />,
    }),
    columnHelper.accessor("submit", {
        header: () => <>Submit</>,
        cell: (info) => <button onClick={() => alert(`Submitted ${JSON.stringify(info.row.original.nombre)}`)} >Enviar</button>
    })
];
type FilterComponentProps = { column: Column<any, unknown>, table: Table<any> };
const FilterComponent = ({ column, table }: FilterComponentProps) => {
    return <div>
        <input 
            type="text" 
            onChange={(e) => column.setFilterValue(e.target.value) } 
            value={column.getFilterValue() as string}
            placeholder={`Filtrar por ${column.id}`}
            />
    </div>
}
function TableView() {
    const [data, setData] = React.useState(() => [...defaultData]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        globalFilterFn: "equalsString",
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder ? null
                                    : <>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanFilter() ? <FilterComponent column={header.column} table={table} /> : null}
                                    </>}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td key={cell.id} className="p-2 border border-black">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default TableView;