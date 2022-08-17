import "./stickyTableHead.css";
import React from "react";
import tw from "tailwind-styled-components";
import { TestResults } from "../../generated/grapqhl";
import {
  Column,
  Row,
  Table,
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

const Button = tw.button`border border-black rounded p-1`;
type SubmitButtonProps = {
  row: Row<TestResults>;
  table: Table<TestResults>;
};
const SubmitButton = (props: SubmitButtonProps) => {
  const value = props.row.getValue;
  return (
    <Button
      onClick={() =>
        props.table.options.meta?.mutate(
          String(value("id")),
          Number(value("nivelOral")),
          Number(value("nivelFinal"))
        )
      }
    >
      Submit
    </Button>
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
        className="border border black"
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
  columnHelper.accessor("email", {
    header: "E-Mail",
    cell: (info) => (
      <a href={`mailto:${info.getValue()}`} target="_blank" rel="noreferrer">
        {info.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor("telefono", {
    header: "Telefono",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("ciclo", {
    header: "Ciclo Ingreso",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("carrera", {
    header: "Carrera",
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

function actionCreator(
  type: "replace" | "append" | "update",
  payload: any
): Action {
  if (type === "update") return { type, options: payload };
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

const StyledTd = tw.td`border border-black`;

type ResultsListProps = {
  reloadPage: () => void;
  initialData?: TestResults[];
  appendData?: TestResults[];
  fetchDataToAppend: () => void;
  submitEntry: (id: any, nivelOral: any, nivelFinal: any) => void;
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

  React.useEffect(() => {
    if (props.initialData) setLocalState(props.initialData);
  }, [props.initialData]);

  React.useEffect(() => {
    if (props.appendData) appendToLocalState(props.appendData);
  }, [props.appendData]);

  const updateCell = (rowIndex: number, columnId: string, value: any) => {
    const updateAction = actionCreator("update", { rowIndex, columnId, value });
    dispatch(updateAction);
  };

  const table = useReactTable({
    columns,
    data: localState,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "equalsString",
    meta: {
      mutate: (id, nivelOral, nivelFinal) => {
        props.submitEntry(id, nivelOral, nivelFinal);
      },
      updateData: updateCell,
      localDispatch: dispatch,
    },
  });

  const [filterEnabled, setFilterEnabled] = React.useState(false);
  React.useEffect(() => {
    table.getColumn("nivelFinal").setFilterValue(filterEnabled);
  }, [filterEnabled, table]);

  const createCsvFile = () => {
    if (Boolean(props.appendData?.length)) {
      const el = document.createElement("a");
      const file = new Blob([parse(localState)], { type: "text/csv" });
      el.hidden = true;
      el.href = URL.createObjectURL(file);
      el.download = "test_results.csv";
      document.body.appendChild(el);
      el.click();
    } else {
      props.fetchDataToAppend();
    }
  };
  function parse(array: any[]) {
    const headers = Object.keys(array[0]);
    const table = array.map((row) => {
      return headers.map((column) => row[column]);
    });
    return [headers].concat(table).join("\n");
  }

  return (
    <section title="TestResults">
      <button onClick={createCsvFile}>Download everything as Excel</button>
      <div>
        {props.appendData ? (
          filterEnabled ? (
            <button onClick={() => setFilterEnabled(false)}>Unfilter</button>
          ) : (
            <button onClick={() => setFilterEnabled(true)}>Filter</button>
          )
        ) : (
          <button onClick={() => props.fetchDataToAppend()}>
            Mostrar Todos
          </button>
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
                <StyledTd key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTd>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ResultsList;
