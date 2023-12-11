import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  correct: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Applicant = {
  __typename?: 'Applicant';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  cicloIngreso: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  id: Scalars['ID'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type ApplicantInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  cicloIngreso: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: InputMaybe<Scalars['String']>;
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type Carrera = {
  __typename?: 'Carrera';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CloseExamResponse = {
  __typename?: 'CloseExamResponse';
  isClosed: Scalars['Boolean'];
};

export type EnrolledStudent = {
  __typename?: 'EnrolledStudent';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  group: Group;
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export enum Filter {
  All = 'ALL',
  Assigned = 'ASSIGNED',
  Nonassigned = 'NONASSIGNED'
}

export type Group = {
  __typename?: 'Group';
  aula: Scalars['String'];
  ciclo: Scalars['String'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  teacher: Scalars['String'];
  time: Scalars['String'];
};

export type HomePageMessage = {
  __typename?: 'HomePageMessage';
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type MeetLinkInput = {
  active: Scalars['Boolean'];
  id?: InputMaybe<Scalars['ID']>;
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type MeetLinkInputWithId = {
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  closeExam?: Maybe<CloseExamResponse>;
  databaseSet: Scalars['Int'];
  registerStudent: RegisterResponse;
  removeMeetLink: Scalars['Int'];
  saveOralResults: Scalars['Boolean'];
  saveRegisteringLevels: Array<Scalars['String']>;
  saveWrittenResults: MutationResponse;
  setMeetLink: Scalars['Int'];
  setMeetLinks: Scalars['Int'];
  setPlacementHomePageMessage: Scalars['Boolean'];
};


export type MutationDatabaseSetArgs = {
  input?: InputMaybe<FirebaseInput>;
};


export type MutationRegisterStudentArgs = {
  groupId: Scalars['String'];
  input: StudentInput;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSaveOralResultsArgs = {
  input?: InputMaybe<OralResults>;
};


export type MutationSaveRegisteringLevelsArgs = {
  course: Scalars['String'];
  levels: Array<Scalars['String']>;
};


export type MutationSaveWrittenResultsArgs = {
  input?: InputMaybe<WrittenResultsInput>;
};


export type MutationSetMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSetMeetLinksArgs = {
  links: Array<MeetLinkInput>;
};


export type MutationSetPlacementHomePageMessageArgs = {
  input: PlacementHomePageMessageInput;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  id: Scalars['String'];
  meetLink?: Maybe<Scalars['String']>;
};

export type OralResults = {
  id: Scalars['ID'];
  nivelFinal: Scalars['Int'];
  nivelOral: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PlacementHomePageMessageInput = {
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  applicant: Applicant;
  carreras: Array<Carrera>;
  database?: Maybe<Array<Maybe<Scalars['String']>>>;
  group: Group;
  groups: Array<Group>;
  isClosed: Scalars['Boolean'];
  masterlist: Array<EnrolledStudent>;
  meetLinks: Array<MeetLink>;
  placementHomePageMessage: HomePageMessage;
  registeringLevels: Array<Scalars['String']>;
  section: Section;
  testResults: Array<Maybe<TestResults>>;
  unenrolledStudent: UnenrolledStudent;
};


export type QueryApplicantArgs = {
  codigo: Scalars['ID'];
};


export type QueryDatabaseArgs = {
  ref: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryMasterlistArgs = {
  ciclo: Scalars['String'];
};


export type QueryRegisteringLevelsArgs = {
  course: Scalars['String'];
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};


export type QueryTestResultsArgs = {
  filter?: InputMaybe<Filter>;
};


export type QueryUnenrolledStudentArgs = {
  codigo: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  options: Array<AnswerOption>;
  title: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  email: Scalars['String'];
  genero: Scalars['String'];
  group: Group;
  grupo: Scalars['String'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type Section = {
  __typename?: 'Section';
  course: Scalars['String'];
  pageInfo?: Maybe<PageInfo>;
  questions: Array<Question>;
};

export type SerializedOptions = {
  group?: InputMaybe<Scalars['Boolean']>;
  teacher?: InputMaybe<Scalars['Boolean']>;
  time?: InputMaybe<Scalars['Boolean']>;
};

export type StudentInput = {
  cicloActual: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  grupo: Scalars['String'];
  nivel: Scalars['Int'];
};

export type TestResults = {
  __typename?: 'TestResults';
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  generated_id: Scalars['String'];
  genero: Scalars['String'];
  id: Scalars['ID'];
  institutionalEmail?: Maybe<Scalars['String']>;
  meetLink?: Maybe<Scalars['String']>;
  nivelEscrito: Scalars['Int'];
  nivelFinal?: Maybe<Scalars['Int']>;
  nivelOral?: Maybe<Scalars['Int']>;
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type UnenrolledStudent = {
  __typename?: 'UnenrolledStudent';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  cicloIngreso: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  groups: Array<Maybe<Group>>;
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['Int'];
  nombre: Scalars['String'];
  registeredGroup?: Maybe<Group>;
  registering: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type WrittenResultsInput = {
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: InputMaybe<Scalars['String']>;
  nivelEscrito: Scalars['Int'];
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type FirebaseInput = {
  data: Array<InputMaybe<Scalars['String']>>;
  ref: Scalars['String'];
};

export type MeetLink = {
  __typename?: 'meetLink';
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  teacher: Scalars['String'];
};

export type PostResultsMutationVariables = Exact<{
  codigo: Scalars['String'];
  nombre: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  apellidoMaterno: Scalars['String'];
  genero: Scalars['String'];
  ciclo: Scalars['String'];
  carrera: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  institucionalEmail?: InputMaybe<Scalars['String']>;
  externo: Scalars['Boolean'];
  reubicacion: Scalars['Boolean'];
  nivelEscrito: Scalars['Int'];
  curso: Scalars['String'];
}>;


export type PostResultsMutation = { __typename?: 'Mutation', saveWrittenResults: { __typename?: 'MutationResponse', id: string, meetLink?: string | null | undefined } };

export type UpdateSingleLinkMutationVariables = Exact<{
  link: MeetLinkInputWithId;
}>;


export type UpdateSingleLinkMutation = { __typename?: 'Mutation', setMeetLink: number };

export type RemoveSingleLinkMutationVariables = Exact<{
  link: MeetLinkInputWithId;
}>;


export type RemoveSingleLinkMutation = { __typename?: 'Mutation', removeMeetLink: number };

export type Get_Default_SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Default_SettingsQuery = { __typename?: 'Query', isClosed: boolean, meetLinks: Array<{ __typename?: 'meetLink', id: string, teacher: string, link: string, active: boolean }> };

export type Close_ExamMutationVariables = Exact<{ [key: string]: never; }>;


export type Close_ExamMutation = { __typename?: 'Mutation', closeExam?: { __typename?: 'CloseExamResponse', isClosed: boolean } | null | undefined };

export type TestSectionQueryVariables = Exact<{
  course: Scalars['String'];
  level: Scalars['Int'];
}>;


export type TestSectionQuery = { __typename?: 'Query', section: { __typename?: 'Section', questions: Array<{ __typename?: 'Question', title: string, options: Array<{ __typename?: 'AnswerOption', text: string, correct: boolean }> }>, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } | null | undefined } };

export type GetTestResultsQueryVariables = Exact<{
  filter?: InputMaybe<Filter>;
}>;


export type GetTestResultsQuery = { __typename?: 'Query', testResults: Array<{ __typename?: 'TestResults', id: string, codigo: string, nombre: string, apellidoPaterno: string, apellidoMaterno: string, genero: string, ciclo: string, carrera: string, telefono: string, email: string, institutionalEmail?: string | null | undefined, curso: string, externo: boolean, reubicacion: boolean, generated_id: string, meetLink?: string | null | undefined, nivelEscrito: number, nivelOral?: number | null | undefined, nivelFinal?: number | null | undefined } | null | undefined> };

export type SaveFinalResultsMutationVariables = Exact<{
  id: Scalars['ID'];
  nivelOral: Scalars['Int'];
  nivelFinal: Scalars['Int'];
}>;


export type SaveFinalResultsMutation = { __typename?: 'Mutation', saveOralResults: boolean };

export type DefaultSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type DefaultSettingsQuery = { __typename?: 'Query', isClosed: boolean, placementHomePageMessage: { __typename?: 'HomePageMessage', active: boolean, message: string }, meetLinks: Array<{ __typename?: 'meetLink', id: string, teacher: string, link: string, active: boolean }> };

export type CloseExamMutationVariables = Exact<{ [key: string]: never; }>;


export type CloseExamMutation = { __typename?: 'Mutation', closeExam?: { __typename?: 'CloseExamResponse', isClosed: boolean } | null | undefined };

export type UpdateHomePageMessageMutationVariables = Exact<{
  input: PlacementHomePageMessageInput;
}>;


export type UpdateHomePageMessageMutation = { __typename?: 'Mutation', setPlacementHomePageMessage: boolean };

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = { __typename?: 'Query', isClosed: boolean, carreras: Array<{ __typename?: 'Carrera', name: string }>, placementHomePageMessage: { __typename?: 'HomePageMessage', active: boolean, message: string } };


export const PostResultsDocument = gql`
    mutation PostResults($codigo: String!, $nombre: String!, $apellidoPaterno: String!, $apellidoMaterno: String!, $genero: String!, $ciclo: String!, $carrera: String!, $telefono: String!, $email: String!, $institucionalEmail: String, $externo: Boolean!, $reubicacion: Boolean!, $nivelEscrito: Int!, $curso: String!) {
  saveWrittenResults(
    input: {codigo: $codigo, nombre: $nombre, apellidoPaterno: $apellidoPaterno, apellidoMaterno: $apellidoMaterno, genero: $genero, ciclo: $ciclo, carrera: $carrera, telefono: $telefono, email: $email, institucionalEmail: $institucionalEmail, externo: $externo, reubicacion: $reubicacion, nivelEscrito: $nivelEscrito, curso: $curso}
  ) {
    id
    meetLink
  }
}
    `;
export type PostResultsMutationFn = Apollo.MutationFunction<PostResultsMutation, PostResultsMutationVariables>;

/**
 * __usePostResultsMutation__
 *
 * To run a mutation, you first call `usePostResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postResultsMutation, { data, loading, error }] = usePostResultsMutation({
 *   variables: {
 *      codigo: // value for 'codigo'
 *      nombre: // value for 'nombre'
 *      apellidoPaterno: // value for 'apellidoPaterno'
 *      apellidoMaterno: // value for 'apellidoMaterno'
 *      genero: // value for 'genero'
 *      ciclo: // value for 'ciclo'
 *      carrera: // value for 'carrera'
 *      telefono: // value for 'telefono'
 *      email: // value for 'email'
 *      institucionalEmail: // value for 'institucionalEmail'
 *      externo: // value for 'externo'
 *      reubicacion: // value for 'reubicacion'
 *      nivelEscrito: // value for 'nivelEscrito'
 *      curso: // value for 'curso'
 *   },
 * });
 */
export function usePostResultsMutation(baseOptions?: Apollo.MutationHookOptions<PostResultsMutation, PostResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostResultsMutation, PostResultsMutationVariables>(PostResultsDocument, options);
      }
export type PostResultsMutationHookResult = ReturnType<typeof usePostResultsMutation>;
export type PostResultsMutationResult = Apollo.MutationResult<PostResultsMutation>;
export type PostResultsMutationOptions = Apollo.BaseMutationOptions<PostResultsMutation, PostResultsMutationVariables>;
export const UpdateSingleLinkDocument = gql`
    mutation updateSingleLink($link: MeetLinkInputWithID!) {
  setMeetLink(link: $link)
}
    `;
export type UpdateSingleLinkMutationFn = Apollo.MutationFunction<UpdateSingleLinkMutation, UpdateSingleLinkMutationVariables>;

/**
 * __useUpdateSingleLinkMutation__
 *
 * To run a mutation, you first call `useUpdateSingleLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSingleLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSingleLinkMutation, { data, loading, error }] = useUpdateSingleLinkMutation({
 *   variables: {
 *      link: // value for 'link'
 *   },
 * });
 */
export function useUpdateSingleLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSingleLinkMutation, UpdateSingleLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSingleLinkMutation, UpdateSingleLinkMutationVariables>(UpdateSingleLinkDocument, options);
      }
export type UpdateSingleLinkMutationHookResult = ReturnType<typeof useUpdateSingleLinkMutation>;
export type UpdateSingleLinkMutationResult = Apollo.MutationResult<UpdateSingleLinkMutation>;
export type UpdateSingleLinkMutationOptions = Apollo.BaseMutationOptions<UpdateSingleLinkMutation, UpdateSingleLinkMutationVariables>;
export const RemoveSingleLinkDocument = gql`
    mutation removeSingleLink($link: MeetLinkInputWithID!) {
  removeMeetLink(link: $link)
}
    `;
export type RemoveSingleLinkMutationFn = Apollo.MutationFunction<RemoveSingleLinkMutation, RemoveSingleLinkMutationVariables>;

/**
 * __useRemoveSingleLinkMutation__
 *
 * To run a mutation, you first call `useRemoveSingleLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSingleLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSingleLinkMutation, { data, loading, error }] = useRemoveSingleLinkMutation({
 *   variables: {
 *      link: // value for 'link'
 *   },
 * });
 */
export function useRemoveSingleLinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSingleLinkMutation, RemoveSingleLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSingleLinkMutation, RemoveSingleLinkMutationVariables>(RemoveSingleLinkDocument, options);
      }
export type RemoveSingleLinkMutationHookResult = ReturnType<typeof useRemoveSingleLinkMutation>;
export type RemoveSingleLinkMutationResult = Apollo.MutationResult<RemoveSingleLinkMutation>;
export type RemoveSingleLinkMutationOptions = Apollo.BaseMutationOptions<RemoveSingleLinkMutation, RemoveSingleLinkMutationVariables>;
export const Get_Default_SettingsDocument = gql`
    query GET_DEFAULT_SETTINGS {
  isClosed
  meetLinks {
    id
    teacher
    link
    active
  }
}
    `;

/**
 * __useGet_Default_SettingsQuery__
 *
 * To run a query within a React component, call `useGet_Default_SettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Default_SettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Default_SettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_Default_SettingsQuery(baseOptions?: Apollo.QueryHookOptions<Get_Default_SettingsQuery, Get_Default_SettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_Default_SettingsQuery, Get_Default_SettingsQueryVariables>(Get_Default_SettingsDocument, options);
      }
export function useGet_Default_SettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Default_SettingsQuery, Get_Default_SettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_Default_SettingsQuery, Get_Default_SettingsQueryVariables>(Get_Default_SettingsDocument, options);
        }
export type Get_Default_SettingsQueryHookResult = ReturnType<typeof useGet_Default_SettingsQuery>;
export type Get_Default_SettingsLazyQueryHookResult = ReturnType<typeof useGet_Default_SettingsLazyQuery>;
export type Get_Default_SettingsQueryResult = Apollo.QueryResult<Get_Default_SettingsQuery, Get_Default_SettingsQueryVariables>;
export const Close_ExamDocument = gql`
    mutation CLOSE_EXAM {
  closeExam {
    isClosed
  }
}
    `;
export type Close_ExamMutationFn = Apollo.MutationFunction<Close_ExamMutation, Close_ExamMutationVariables>;

/**
 * __useClose_ExamMutation__
 *
 * To run a mutation, you first call `useClose_ExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClose_ExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeExamMutation, { data, loading, error }] = useClose_ExamMutation({
 *   variables: {
 *   },
 * });
 */
export function useClose_ExamMutation(baseOptions?: Apollo.MutationHookOptions<Close_ExamMutation, Close_ExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Close_ExamMutation, Close_ExamMutationVariables>(Close_ExamDocument, options);
      }
export type Close_ExamMutationHookResult = ReturnType<typeof useClose_ExamMutation>;
export type Close_ExamMutationResult = Apollo.MutationResult<Close_ExamMutation>;
export type Close_ExamMutationOptions = Apollo.BaseMutationOptions<Close_ExamMutation, Close_ExamMutationVariables>;
export const TestSectionDocument = gql`
    query testSection($course: String!, $level: Int!) {
  section(course: $course, level: $level) {
    questions {
      title
      options {
        text
        correct
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useTestSectionQuery__
 *
 * To run a query within a React component, call `useTestSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestSectionQuery({
 *   variables: {
 *      course: // value for 'course'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useTestSectionQuery(baseOptions: Apollo.QueryHookOptions<TestSectionQuery, TestSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestSectionQuery, TestSectionQueryVariables>(TestSectionDocument, options);
      }
export function useTestSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestSectionQuery, TestSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestSectionQuery, TestSectionQueryVariables>(TestSectionDocument, options);
        }
export type TestSectionQueryHookResult = ReturnType<typeof useTestSectionQuery>;
export type TestSectionLazyQueryHookResult = ReturnType<typeof useTestSectionLazyQuery>;
export type TestSectionQueryResult = Apollo.QueryResult<TestSectionQuery, TestSectionQueryVariables>;
export const GetTestResultsDocument = gql`
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

/**
 * __useGetTestResultsQuery__
 *
 * To run a query within a React component, call `useGetTestResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestResultsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetTestResultsQuery(baseOptions?: Apollo.QueryHookOptions<GetTestResultsQuery, GetTestResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTestResultsQuery, GetTestResultsQueryVariables>(GetTestResultsDocument, options);
      }
export function useGetTestResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestResultsQuery, GetTestResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTestResultsQuery, GetTestResultsQueryVariables>(GetTestResultsDocument, options);
        }
export type GetTestResultsQueryHookResult = ReturnType<typeof useGetTestResultsQuery>;
export type GetTestResultsLazyQueryHookResult = ReturnType<typeof useGetTestResultsLazyQuery>;
export type GetTestResultsQueryResult = Apollo.QueryResult<GetTestResultsQuery, GetTestResultsQueryVariables>;
export const SaveFinalResultsDocument = gql`
    mutation saveFinalResults($id: ID!, $nivelOral: Int!, $nivelFinal: Int!) {
  saveOralResults(
    input: {id: $id, nivelOral: $nivelOral, nivelFinal: $nivelFinal}
  )
}
    `;
export type SaveFinalResultsMutationFn = Apollo.MutationFunction<SaveFinalResultsMutation, SaveFinalResultsMutationVariables>;

/**
 * __useSaveFinalResultsMutation__
 *
 * To run a mutation, you first call `useSaveFinalResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveFinalResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveFinalResultsMutation, { data, loading, error }] = useSaveFinalResultsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      nivelOral: // value for 'nivelOral'
 *      nivelFinal: // value for 'nivelFinal'
 *   },
 * });
 */
export function useSaveFinalResultsMutation(baseOptions?: Apollo.MutationHookOptions<SaveFinalResultsMutation, SaveFinalResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveFinalResultsMutation, SaveFinalResultsMutationVariables>(SaveFinalResultsDocument, options);
      }
export type SaveFinalResultsMutationHookResult = ReturnType<typeof useSaveFinalResultsMutation>;
export type SaveFinalResultsMutationResult = Apollo.MutationResult<SaveFinalResultsMutation>;
export type SaveFinalResultsMutationOptions = Apollo.BaseMutationOptions<SaveFinalResultsMutation, SaveFinalResultsMutationVariables>;
export const DefaultSettingsDocument = gql`
    query DefaultSettings {
  placementHomePageMessage {
    active
    message
  }
  isClosed
  meetLinks {
    id
    teacher
    link
    active
  }
}
    `;

/**
 * __useDefaultSettingsQuery__
 *
 * To run a query within a React component, call `useDefaultSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefaultSettingsQuery(baseOptions?: Apollo.QueryHookOptions<DefaultSettingsQuery, DefaultSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DefaultSettingsQuery, DefaultSettingsQueryVariables>(DefaultSettingsDocument, options);
      }
export function useDefaultSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultSettingsQuery, DefaultSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DefaultSettingsQuery, DefaultSettingsQueryVariables>(DefaultSettingsDocument, options);
        }
export type DefaultSettingsQueryHookResult = ReturnType<typeof useDefaultSettingsQuery>;
export type DefaultSettingsLazyQueryHookResult = ReturnType<typeof useDefaultSettingsLazyQuery>;
export type DefaultSettingsQueryResult = Apollo.QueryResult<DefaultSettingsQuery, DefaultSettingsQueryVariables>;
export const CloseExamDocument = gql`
    mutation CloseExam {
  closeExam {
    isClosed
  }
}
    `;
export type CloseExamMutationFn = Apollo.MutationFunction<CloseExamMutation, CloseExamMutationVariables>;

/**
 * __useCloseExamMutation__
 *
 * To run a mutation, you first call `useCloseExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeExamMutation, { data, loading, error }] = useCloseExamMutation({
 *   variables: {
 *   },
 * });
 */
export function useCloseExamMutation(baseOptions?: Apollo.MutationHookOptions<CloseExamMutation, CloseExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseExamMutation, CloseExamMutationVariables>(CloseExamDocument, options);
      }
export type CloseExamMutationHookResult = ReturnType<typeof useCloseExamMutation>;
export type CloseExamMutationResult = Apollo.MutationResult<CloseExamMutation>;
export type CloseExamMutationOptions = Apollo.BaseMutationOptions<CloseExamMutation, CloseExamMutationVariables>;
export const UpdateHomePageMessageDocument = gql`
    mutation UpdateHomePageMessage($input: PlacementHomePageMessageInput!) {
  setPlacementHomePageMessage(input: $input)
}
    `;
export type UpdateHomePageMessageMutationFn = Apollo.MutationFunction<UpdateHomePageMessageMutation, UpdateHomePageMessageMutationVariables>;

/**
 * __useUpdateHomePageMessageMutation__
 *
 * To run a mutation, you first call `useUpdateHomePageMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHomePageMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHomePageMessageMutation, { data, loading, error }] = useUpdateHomePageMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHomePageMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHomePageMessageMutation, UpdateHomePageMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHomePageMessageMutation, UpdateHomePageMessageMutationVariables>(UpdateHomePageMessageDocument, options);
      }
export type UpdateHomePageMessageMutationHookResult = ReturnType<typeof useUpdateHomePageMessageMutation>;
export type UpdateHomePageMessageMutationResult = Apollo.MutationResult<UpdateHomePageMessageMutation>;
export type UpdateHomePageMessageMutationOptions = Apollo.BaseMutationOptions<UpdateHomePageMessageMutation, UpdateHomePageMessageMutationVariables>;
export const HomePageDocument = gql`
    query HomePage {
  carreras {
    name
  }
  placementHomePageMessage {
    active
    message
  }
  isClosed
}
    `;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageQuery(baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
      }
export function useHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<typeof useHomePageLazyQuery>;
export type HomePageQueryResult = Apollo.QueryResult<HomePageQuery, HomePageQueryVariables>;