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
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  desertor: Scalars['Boolean'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  registeredSchedule?: Maybe<Schedule>;
  registering: Scalars['Boolean'];
  schedules: Array<Schedule>;
  telefono: Scalars['String'];
};

export type ApplicantInput = {
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
  institucionalEmail?: InputMaybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
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
  institucionalEmail?: Maybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type AttendingStudent = {
  apellido_materno?: InputMaybe<Scalars['String']>;
  apellido_paterno: Scalars['String'];
  attended: Scalars['Boolean'];
  codigo: Scalars['String'];
  grupo: Scalars['String'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  teacher: Scalars['String'];
  workshop: Scalars['String'];
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

export enum Filter {
  All = 'ALL',
  Assigned = 'ASSIGNED',
  Nonassigned = 'NONASSIGNED'
}

export type Grades = {
  __typename?: 'Grades';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  codigo: Scalars['String'];
  cultural_task: Scalars['String'];
  final: Scalars['String'];
  final_grammar: Scalars['String'];
  final_oral: Scalars['String'];
  listening: Scalars['String'];
  midterm_grammar: Scalars['String'];
  midterm_oral: Scalars['String'];
  mini_project: Scalars['String'];
  nombre: Scalars['String'];
  reading: Scalars['String'];
  situation: Scalars['String'];
  workshops: Scalars['String'];
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
  addStudent: Student;
  closeExam?: Maybe<CloseExamResponse>;
  databaseSet: Scalars['Int'];
  editStudent: Student;
  makeWorkshopReservation: StudentReservation;
  registerStudent: RegisterResponse;
  removeMeetLink: Scalars['Int'];
  resetReservations: Scalars['Boolean'];
  saveApplicant: ApplicantResponse;
  saveOralResults: Scalars['Boolean'];
  saveRegisteringLevels: Array<Scalars['String']>;
  saveWorkshopsAttendance: Scalars['Boolean'];
  saveWrittenResults: MutationResponse;
  setMeetLink: Scalars['Int'];
  setMeetLinks: Scalars['Int'];
  setPlacementHomePageMessage: Scalars['Boolean'];
  setWorkshopLink: Scalars['Boolean'];
  toggleOpenWorkshops: Scalars['Boolean'];
};


export type MutationAddStudentArgs = {
  student: StudentInput;
};


export type MutationDatabaseSetArgs = {
  input?: InputMaybe<FirebaseInput>;
};


export type MutationEditStudentArgs = {
  changes?: InputMaybe<StudentChangesInput>;
  codigo: Scalars['ID'];
};


export type MutationMakeWorkshopReservationArgs = {
  option_id: Scalars['ID'];
  student_id: Scalars['ID'];
  tutorial_reason?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterStudentArgs = {
  input: StudentInput;
};


export type MutationRemoveMeetLinkArgs = {
  link: MeetLinkInputWithId;
};


export type MutationSaveApplicantArgs = {
  codigo: Scalars['String'];
  input: ApplicantInput;
};


export type MutationSaveOralResultsArgs = {
  input?: InputMaybe<OralResults>;
};


export type MutationSaveRegisteringLevelsArgs = {
  course: Scalars['String'];
  levels: Array<Scalars['String']>;
};


export type MutationSaveWorkshopsAttendanceArgs = {
  input: Array<AttendingStudent>;
  option_id: Scalars['ID'];
  teacher_id: Scalars['ID'];
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


export type MutationSetWorkshopLinkArgs = {
  option_id: Scalars['ID'];
  url: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  id: Scalars['String'];
  meetLink?: Maybe<Scalars['String']>;
};

export type Option = {
  __typename?: 'Option';
  active: Scalars['Boolean'];
  available: Scalars['Boolean'];
  day: Scalars['String'];
  id: Scalars['ID'];
  isTutorial: Scalars['Boolean'];
  teacher_id: Scalars['String'];
  teacher_name: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
};

export type OralResults = {
  id: Scalars['Int'];
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
  getWorkshopsByCategory: Workshop;
  grades: Grades;
  isClosed: Scalars['Boolean'];
  isWorkshopsOpen: Scalars['Boolean'];
  meetLinks: Array<MeetLink>;
  options: Array<Option>;
  paramQuery?: Maybe<Scalars['Boolean']>;
  placementHomePageMessage: HomePageMessage;
  registeringLevels: Array<Scalars['String']>;
  schedule: Schedule;
  section: Section;
  student: Student;
  teacher: Teacher;
  teachers: Array<Teacher>;
  testResults: Array<Maybe<TestResults>>;
  workshops: Array<Workshop>;
};


export type QueryApplicantArgs = {
  codigo: Scalars['ID'];
};


export type QueryDatabaseArgs = {
  ref: Scalars['String'];
};


export type QueryGetWorkshopsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryGradesArgs = {
  codigo: Scalars['String'];
};


export type QueryParamQueryArgs = {
  param?: InputMaybe<Scalars['String']>;
};


export type QueryRegisteringLevelsArgs = {
  course: Scalars['String'];
};


export type QueryScheduleArgs = {
  id: Scalars['String'];
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};


export type QueryStudentArgs = {
  codigo: Scalars['ID'];
};


export type QueryTeacherArgs = {
  id: Scalars['ID'];
};


export type QueryTestResultsArgs = {
  filter?: InputMaybe<Filter>;
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
  grupo: Scalars['String'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  schedule: Schedule;
  telefono: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  codigo: Scalars['String'];
  email: Scalars['String'];
  grupo: Scalars['String'];
  id: Scalars['ID'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  option_id: Scalars['String'];
  telefono: Scalars['String'];
  tutorial_reason?: Maybe<Scalars['String']>;
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
};

export type Schedule = {
  __typename?: 'Schedule';
  chat?: Maybe<Scalars['String']>;
  classroom?: Maybe<Scalars['String']>;
  entry: Scalars['String'];
  group: Scalars['String'];
  serialized: Scalars['String'];
  sesiones?: Maybe<Scalars['String']>;
  teacher: Scalars['String'];
  time?: Maybe<Scalars['String']>;
};


export type ScheduleSerializedArgs = {
  options: SerializedOptions;
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

export type Student = {
  __typename?: 'Student';
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  id: Scalars['ID'];
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  reservation?: Maybe<StudentReservation>;
  reservationCount: Scalars['Int'];
  reservationLimit: Scalars['Int'];
  telefono: Scalars['String'];
};

export type StudentChangesInput = {
  apellido_materno?: InputMaybe<Scalars['String']>;
  apellido_paterno?: InputMaybe<Scalars['String']>;
  carrera?: InputMaybe<Scalars['String']>;
  ciclo?: InputMaybe<Scalars['String']>;
  codigo?: InputMaybe<Scalars['String']>;
  curso?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  externo?: InputMaybe<Scalars['Boolean']>;
  genero?: InputMaybe<Scalars['String']>;
  grupo?: InputMaybe<Scalars['String']>;
  nivel?: InputMaybe<Scalars['String']>;
  nombre?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
};

export type StudentInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['ID'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  grupo: Scalars['String'];
  institucionalEmail?: InputMaybe<Scalars['String']>;
  nivel: Scalars['String'];
  nombre: Scalars['String'];
  telefono: Scalars['String'];
};

export type StudentReservation = {
  __typename?: 'StudentReservation';
  day: Scalars['String'];
  id: Scalars['ID'];
  teacher_id: Scalars['ID'];
  teacher_name: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  name: Scalars['String'];
  options: Array<TeacherOption>;
};


export type TeacherOptionsArgs = {
  sorted?: InputMaybe<Scalars['Boolean']>;
};

export type TeacherOption = {
  __typename?: 'TeacherOption';
  day: Scalars['String'];
  id: Scalars['ID'];
  reservations?: Maybe<Array<Reservation>>;
  teacher_id: Scalars['String'];
  teacher_name: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
  workshop_id: Scalars['String'];
  workshop_name: Scalars['String'];
  zoom_id?: Maybe<Scalars['String']>;
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
  institutionalEmail?: Maybe<Scalars['String']>;
  meetLink: Scalars['String'];
  nivelEscrito: Scalars['Int'];
  nivelFinal?: Maybe<Scalars['Int']>;
  nivelOral?: Maybe<Scalars['Int']>;
  nombre: Scalars['String'];
  reubicacion: Scalars['Boolean'];
  telefono: Scalars['String'];
};

export type Workshop = {
  __typename?: 'Workshop';
  description: Scalars['String'];
  id: Scalars['ID'];
  levels: Array<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Option>;
};

export type WrittenResultsInput = {
  apellido_materno: Scalars['String'];
  apellido_paterno: Scalars['String'];
  carrera: Scalars['String'];
  ciclo: Scalars['String'];
  codigo: Scalars['String'];
  curso: Scalars['String'];
  email: Scalars['String'];
  externo: Scalars['Boolean'];
  genero: Scalars['String'];
  institucionalEmail?: InputMaybe<Scalars['String']>;
  nivel_escrito: Scalars['Int'];
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
  apellido_paterno: Scalars['String'];
  apellido_materno: Scalars['String'];
  genero: Scalars['String'];
  ciclo: Scalars['String'];
  carrera: Scalars['String'];
  telefono: Scalars['String'];
  email: Scalars['String'];
  institucionalEmail?: InputMaybe<Scalars['String']>;
  externo: Scalars['Boolean'];
  reubicacion: Scalars['Boolean'];
  nivel_escrito: Scalars['Int'];
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

export type GetTestResultsQueryVariables = Exact<{
  filter?: InputMaybe<Filter>;
}>;


export type GetTestResultsQuery = { __typename?: 'Query', testResults: Array<{ __typename?: 'TestResults', codigo: string, nombre: string, apellidoPaterno: string, apellidoMaterno: string, genero: string, ciclo: string, carrera: string, telefono: string, email: string, institutionalEmail?: string | null | undefined, curso: string, externo: boolean, reubicacion: boolean, generated_id: string, meetLink: string, nivelEscrito: number, nivelOral?: number | null | undefined, nivelFinal?: number | null | undefined } | null | undefined> };

export type Get_Default_SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Default_SettingsQuery = { __typename?: 'Query', isClosed: boolean, meetLinks: Array<{ __typename?: 'meetLink', id: string, teacher: string, link: string, active: boolean }> };

export type Close_ExamMutationVariables = Exact<{ [key: string]: never; }>;


export type Close_ExamMutation = { __typename?: 'Mutation', closeExam?: { __typename?: 'CloseExamResponse', isClosed: boolean } | null | undefined };

export type TestSectionQueryVariables = Exact<{
  course: Scalars['String'];
  level: Scalars['Int'];
}>;


export type TestSectionQuery = { __typename?: 'Query', section: { __typename?: 'Section', questions: Array<{ __typename?: 'Question', title: string, options: Array<{ __typename?: 'AnswerOption', text: string, correct: boolean }> }>, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } | null | undefined } };

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
    mutation PostResults($codigo: String!, $nombre: String!, $apellido_paterno: String!, $apellido_materno: String!, $genero: String!, $ciclo: String!, $carrera: String!, $telefono: String!, $email: String!, $institucionalEmail: String, $externo: Boolean!, $reubicacion: Boolean!, $nivel_escrito: Int!, $curso: String!) {
  saveWrittenResults(
    input: {codigo: $codigo, nombre: $nombre, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno, genero: $genero, ciclo: $ciclo, carrera: $carrera, telefono: $telefono, email: $email, institucionalEmail: $institucionalEmail, externo: $externo, reubicacion: $reubicacion, nivel_escrito: $nivel_escrito, curso: $curso}
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
 *      apellido_paterno: // value for 'apellido_paterno'
 *      apellido_materno: // value for 'apellido_materno'
 *      genero: // value for 'genero'
 *      ciclo: // value for 'ciclo'
 *      carrera: // value for 'carrera'
 *      telefono: // value for 'telefono'
 *      email: // value for 'email'
 *      institucionalEmail: // value for 'institucionalEmail'
 *      externo: // value for 'externo'
 *      reubicacion: // value for 'reubicacion'
 *      nivel_escrito: // value for 'nivel_escrito'
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
export const GetTestResultsDocument = gql`
    query getTestResults($filter: Filter) {
  testResults(filter: $filter) {
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