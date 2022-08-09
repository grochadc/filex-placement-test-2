import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

type Applicant = {
    nombre: string
    apellidoMaterno: string
    apellidoPaterno: string
    meetLink: string
    nivelEscrito: number
    nivelOral?: number
    nivelFinal?: number
}

const defaultData: Applicant[] = [
    {
        nombre: "Benito Antonio",
        apellidoPaterno: "Martinez",
        apellidoMaterno: "Ocasio",
        meetLink: "meetLink1",
        nivelEscrito: 4,
        nivelOral: undefined,
        nivelFinal: undefined
    },
    {
        nombre: "Alberto",
        apellidoPaterno: "Aguilera",
        apellidoMaterno: "Valadez",
        meetLink: "meetLink2",
        nivelEscrito: 3,
        nivelOral: undefined,
        nivelFinal: undefined
    }
];

const columnHelper = createColumnHelper<Applicant>();

const columns = [
    columnHelper.accessor("nombre",{
        header: () => <>Nombre</>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apellidoPaterno",{
        header: () => <>Apellido Paterno</>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apellidoMaterno",{
        header: () => <>Apellido Paterno</>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("meetLink",{
        header: () => <>Meet Link</>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nivelEscrito",{
        header: () => <>Escrito</>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nivelOral",{
        header: () => <>Oral</>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nivelFinal",{
        header: () => <>Final</>,
        cell: (info) => info.getValue(),
    }),
];

function TableView() {
    const [data, setData] = React.useState(() => [...defaultData]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody> 
            </tbody>
        </table>
    )
}

export default TableView;