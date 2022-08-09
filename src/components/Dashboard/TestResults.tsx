import React from 'react';
import { useQuery, gql } from "@apollo/client";
import {TestResults, useGetTestResultsQuery, useGetTestResultsLazyQuery, Filter} from "../../generated/grapqhl";

export const TestResultsQuery = gql`
    query getTestResults($filter: Filter) {
        testResults (filter: $filter) {
            codigo
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            genero,
            ciclo,
            carrera,
            telefono,
            email,
            institutionalEmail, 
            curso,
            externo,
            reubicacion,
            generated_id,
            meetLink,
            nivelEscrito,
            nivelOral,
            nivelFinal
        }
    }
`;

const results: TestResults[] = [
    {
        codigo: "0987654321",
        nombre: "Alberto",
        apellidoPaterno: "Aguilera",
        apellidoMaterno: "Valadez",
        genero: "M",
        ciclo: "2022B",
        carrera: "Abogado",
        telefono: "312123456",
        email: "juanga@elnoanoa.mx",
        institutionalEmail: null,
        nivelEscrito: 4,
        curso: "en",
        externo: false,
        reubicacion: false,
        generated_id: "ov0t8k",
        meetLink: "https://meet.google.com/moh-ngxa-fqh"  
},
{
    codigo: "0987654321",
    nombre: "Alberto",
    apellidoPaterno: "Aguilera",
    apellidoMaterno: "Valadez",
    genero: "M",
    ciclo: "2022B",
    carrera: "Abogado",
    telefono: "312123456",
    email: "juanga@elnoanoa.mx",
    institutionalEmail: null,
    nivelEscrito: 2,
    curso: "en",
    externo: false,
    reubicacion: false,
    generated_id: "ov0t8k",
    meetLink: "https://meet.google.com/moh-ngxa-fqh" 
}];


type ResultsListProps = {};
function ResultsList(props: ResultsListProps){
    const {error, loading, data} = useGetTestResultsQuery({ variables: { filter: Filter.Nonassigned } });

    const [
        fetchAssignedResults,
        { loading: loadingLazy, error: errorLazy, data: dataAssignedResults }
    ] = useGetTestResultsLazyQuery({ variables: { filter: Filter.Assigned } });

    const [localState, setLocalState] = React.useState<any[]>([]);
    const [assignedLevels, setAssignedLevels] = React.useState<{id: number, nivelOral: number, nivelFinal: number}|null[]>([]);
    React.useEffect(() => {
        if (loading === false && data) {
            setLocalState(data.testResults)
        }
    }, [loading, data]);

    React.useEffect(() => {
        if (loadingLazy === false && dataAssignedResults) {
            setLocalState(localState?.concat(dataAssignedResults.testResults))
        }
    }, [loadingLazy, dataAssignedResults])

    const filterBy = (prop: string, value: string) => (item: any) => item[prop] == value;

    function getUniqueValuesByProp(arr: any[], prop: string): string[] {
        const result = arr.map((item) => item[prop])
                .filter((value,index,self) => self.indexOf(value) === index);
        return result;
    }

    function useOpenFilterModal (arr: any[], prop: string): [boolean, string[], () => void] {
        const values = getUniqueValuesByProp(arr, prop);
        const [filtrando, setFiltrando] = React.useState(false);
        function toggleModal() {
            setFiltrando(!filtrando);
        }
        return [filtrando, values, toggleModal];
    };

    const [filtrando, values, toggleModal] = useOpenFilterModal(localState, "meetLink");
    const [filters, dispatchFilters] = React.useReducer((state: any[], action: { type: string, payload?: any }) => {
        console.log("entered reducer");
        console.log("action")
        switch(action.type){
            case "insert":
                return state.concat(action.payload);
            case "delete":
                const foundIndex = state.indexOf(action.payload);
                const finalIndex = state.length - 1;
                if(foundIndex > 0) return state;
                if(foundIndex == 0) return state.slice(1,finalIndex);
                if(foundIndex == finalIndex) return state.slice(0,finalIndex);
                return [...state.slice(0,foundIndex),
                        ...state.slice(foundIndex, state.length)];
            default:
                return state;
        }
    },[])

    React.useEffect(() => {
        console.log("filters", filters)
    }, [filters]);



    if(error) return null;
    if(loading) return null;
    return (
        <section title='TestResults'>
            <div>
                { dataAssignedResults ? null : 
                <button onClick={() => fetchAssignedResults() }>Mostrar Todos</button> }
            </div>
            <button onClick={() => toggleModal()}>Filtros</button>
            {filtrando ? 
                <div>
                    <div className="text-xl">FILTROS</div>
                    <ul>
                        { values.map((item) => {
                            const found = filters.includes(item);
                            const actionType = found ? "delete" : "insert";
                            return (<li key={item}>
                                <input type="checkbox" />
                                {item}
                            </li>) 
                            })
                        }
                    </ul>
                </div> : null}
            <table className="text-center">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Meet Link</th>
                        <th>Nivel Escrito</th>
                        <th>Nivel Oral</th>
                        <th>Nivel Final</th>
                        <th>Enviar</th>
                    </tr>
                </thead>
                <tbody>
                    {localState.map((result: TestResults) => {
                        const disabled = Boolean(result.nivelEscrito <= 2);
                        return (<tr>
                            <td>{result.codigo}</td>
                            <td>{result.nombre}</td>
                            <td>{result.apellidoPaterno}</td>
                            <td><a href={result.meetLink} target="_blank">{result.meetLink}</a></td>
                            <td>{result.nivelEscrito}</td>
                            <td><input type="number" min="1" max="7" 
                                        value={result.nivelOral || 0 } 
                                        onChange={() => } 
                                        /></td>
                            <td><input type="number" min="1" max="7" value={result.nivelFinal || 0} /></td>
                            <td><button>Enviar</button></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </section>
    )
};

export default ResultsList;
