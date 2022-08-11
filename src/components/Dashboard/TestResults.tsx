import "./stickyTableHead.css";
import React from "react";
import { gql } from "@apollo/client";
import {
  TestResults,
  useGetTestResultsQuery,
  useGetTestResultsLazyQuery,
  useSaveFinalResultsMutation,
  Filter,
} from "../../generated/grapqhl";
import {
  Column,
  Row,
  Table,
  TableMeta,
  RowData,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    mutate: (id: string, nivelOral: number, nivelFinal: number) => void;
    updateData: (rowIndex: number, columnId: string, value: any) => any;
    localDispatch: React.Dispatch<any>;
  }
}

export const TestResultsQuery = gql`
  query getTestResults($filter: Filter) {
    testResults(filter: $filter) {
      id
      codigo
      nombre
      apellidoPaterno
      apellidoMaterno
      genero
      ciclo
      carrera
      telefono
      email
      institutionalEmail
      curso
      externo
      reubicacion
      generated_id
      meetLink
      nivelEscrito
      nivelOral
      nivelFinal
    }
  }
`;

export const SaveFinalLevelsMutation = gql`
  mutation saveFinalResults($id: ID!, $nivelOral: Int!, $nivelFinal: Int!) {
    saveOralResults(
      input: { id: $id, nivelOral: $nivelOral, nivelFinal: $nivelFinal }
    )
  }
`;

type SubmitButtonProps = {
  row: Row<TestResults>;
  table: Table<TestResults>;
};
const SubmitButton = (props: SubmitButtonProps) => {
  const value = props.row.getValue;
  return (
    <button
      onClick={() =>
        props.table.options.meta?.mutate(
          String(value("id")),
          Number(value("nivelOral")),
          Number(value("nivelFinal"))
        )
      }
    >
      Submit
    </button>
  );
};

type FilterComponentProps = { column: Column<any, unknown>; table: Table<any> };
const FilterComponent = ({ column, table }: FilterComponentProps) => {
  const smallIds = ["id", "nivelEscrito", "nivelOral", "nivelFinal"];
  const smallInput = smallIds.includes(column.id);
  return (
    <div>
      <input
        type="text"
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={column.getFilterValue() as string}
        placeholder={`Filtrar ${column.id}`}
        style={{ width: smallInput ? "30px" : "" }}
      />
    </div>
  );
};

type LevelInputProps = {
  getValue: () => any;
  row: Row<TestResults>;
  column: any;
  table: Table<TestResults>;
};
const LevelInput = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: LevelInputProps) => {
  const initialValue = getValue() || 0;

  const [value, setValue] = React.useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

const columnHelper = createColumnHelper<TestResults>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("codigo", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nombre", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("apellidoPaterno", {
    header: "Apellido Paterno",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("apellidoMaterno", {
    header: "Apellido Materno",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("meetLink", {
    header: "Link",
    cell: (info) => <a href={info.getValue()}>{info.getValue()}</a>,
  }),
  columnHelper.accessor("nivelEscrito", {
    header: "Escrito",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nivelOral", {
    id: "nivelOral",
    header: "Oral",
    cell: LevelInput,
  }),
  columnHelper.accessor("nivelFinal", {
    header: "Final",
    cell: LevelInput,
    filterFn: (row, columnId, filterValue: boolean) => {
      const val = row.getValue(columnId);
      if (filterValue && val !== undefined) return !(Number(val) > 0);
      return true;
    },
  }),
  columnHelper.display({
    id: "submit",
    header: "Submit",
    cell: (info) => <SubmitButton table={info.table} row={info.row} />,
  }),
];

type Action =
  | { type: "replace"; payload: any[] }
  | { type: "append"; payload: any[] }
  | {
      type: "update";
      options: { rowIndex: number; columnId: string; value: any };
    };

function actionCreator<T>(
  type: "replace" | "append" | "update",
  payload: any
): Action {
  if (type == "update") return { type, options: payload };
  return { type, payload };
}

const reducer = (state: TestResults[], action: Action) => {
  switch (action.type) {
    case "replace":
      return action.payload;
    case "append":
      return [...state, ...action.payload];
    case "update":
      return [
        ...state.slice(0, action.options.rowIndex),
        {
          ...state[action.options.rowIndex],
          [action.options.columnId]: action.options.value,
        },
        ...state.slice(action.options.rowIndex + 1),
      ];
    default:
      return state;
  }
};

type ResultsListProps = {
  reloadPage: () => void;
};
function ResultsList(props: ResultsListProps) {
  const [localState, dispatch] = React.useReducer(reducer, []);

  const setLocalState = (arr: any) => {
    const replaceAction = actionCreator("replace", arr);
    if (arr) dispatch(replaceAction);
  };

  const appendToLocalState = (arr: any) => {
    console.log("Appending to state", arr);
    const appendAction = actionCreator("append", arr);
    if (arr) dispatch(appendAction);
  };

  const updateCell = (rowIndex: number, columnId: string, value: any) => {
    const updateAction = actionCreator("update", { rowIndex, columnId, value });
    dispatch(updateAction);
  };

  const { error, loading } = useGetTestResultsQuery({
    variables: { filter: Filter.Nonassigned },
    onCompleted: (data) => setLocalState(data.testResults),
  });

  const [
    fetchAssignedResults,
    { loading: loadingLazy, error: errorLazy, data: dataAssignedResults },
  ] = useGetTestResultsLazyQuery({
    variables: { filter: Filter.Assigned },
    onCompleted: (data) => {
      appendToLocalState(data.testResults);
    },
    onError: (err) => console.error(err),
  });

  const [mutate] = useSaveFinalResultsMutation({
    onCompleted: (data) => {
      alert(`Mutation response ${data.saveOralResults}`);
      props.reloadPage();
    },
    onError: (err) => alert(`There was an error ${JSON.stringify(error)}`),
  });

  const table = useReactTable({
    columns,
    data: localState,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "equalsString",
    meta: {
      mutate: (id, nivelOral, nivelFinal) => {
        mutate({ variables: { id, nivelOral, nivelFinal } });
      },
      updateData: updateCell,
      localDispatch: dispatch,
    },
  });

  const [filterEnabled, setFilterEnabled] = React.useState(false);
  React.useEffect(() => {
    table.getColumn("nivelFinal").setFilterValue(filterEnabled);
  }, [filterEnabled]);

  if (error) return null;
  if (loading) return null;
  return (
    <section title="TestResults">
      <div>
        {dataAssignedResults ? (
          filterEnabled ? (
            <button onClick={() => setFilterEnabled(false)}>Unfilter</button>
          ) : (
            <button onClick={() => setFilterEnabled(true)}>Filter</button>
          )
        ) : (
          <button onClick={() => fetchAssignedResults()}>Mostrar Todos</button>
        )}
      </div>
      <table className="table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <FilterComponent column={header.column} table={table} />
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border border-black">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ResultsList;
