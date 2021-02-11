import React from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import { setApplicant } from "../store/actions";
import { Applicant } from "../store/types";
import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

export const GET_CARRERAS = gql`
  query {
    carreras {
      name
    }
    isClosed
  }
`;

const InformationSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("Obligatorio"),
  apellido_paterno: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Obligatorio"),
  apellido_materno: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Obligatorio"),
  codigo: Yup.number().min(7, "Codigo muy corto"),
  externo: Yup.boolean(),
  telefono: Yup.number().min(10, "Numero muy corto"),
  carrera: Yup.string(),
  reubicacion: Yup.boolean(),
  email: Yup.string().email("email no valido").required("Obligatorio"),
  curso: Yup.string().required("Campo Obligatorio"),
});

const PersonalForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (values: Applicant) => {
    dispatch(setApplicant(values));
    history.push("test");
  };
  const { data, loading } = useQuery(GET_CARRERAS);
  const isClosed = loading ? false : data && data.isClosed;
  const carreras = loading
    ? false
    : data && data.carreras.map((el: { name: string }) => el.name);

  if (loading) return <div>Cargando...</div>;
  if (isClosed)
    return (
      <div>
        <h1>Por el momento no se estan aplicando examenes. Vuelve despues.</h1>
      </div>
    );
  return (
    <div>
      <Formik
        validationSchema={InformationSchema}
        initialValues={{
          codigo: "",
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          genero: "",
          ciclo: "",
          carrera: "Elige una opcion...",
          telefono: "",
          email: "",
          nivel_escrito: 1,
          curso: "",
          externo: false,
          reubicacion: false,
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Container>
            <Form onSubmit={(e) => handleSubmit(e as any)}>
              <Form.Group controlId="codigo">
                <Form.Label>Código:</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  value={values.codigo}
                  onChange={handleChange}
                  disabled={values.externo}
                />
                {touched.codigo && errors.codigo ? (
                  <Alert variant="warning">{errors.codigo}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="externo">
                <input
                  type="checkbox"
                  value={(values.externo as unknown) as string}
                  onChange={handleChange}
                  id="externo"
                />
                <Form.Label> Externo</Form.Label>
              </Form.Group>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                />
                {touched.nombre && errors.nombre ? (
                  <Alert variant="warning">{errors.nombre}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="apellido_paterno">
                <Form.Label>Apellido Paterno:</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido_paterno"
                  value={values.apellido_paterno}
                  onChange={handleChange}
                />
                {touched.apellido_paterno && errors.apellido_paterno ? (
                  <Alert variant="warning">{errors.apellido_paterno}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="apellido_materno">
                <Form.Label>Apellido Materno:</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido_materno"
                  value={values.apellido_materno}
                  onChange={handleChange}
                />
                {touched.apellido_materno && errors.apellido_materno ? (
                  <Alert variant="warning">{errors.apellido_materno}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="telefono">
                <Form.Label>Teléfono Celular:</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={values.telefono}
                  onChange={handleChange}
                />
                {touched.telefono && errors.telefono ? (
                  <Alert variant="warning">{errors.telefono}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Correo Electrónico:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email ? (
                  <Alert variant="warning">{errors.email}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="carrera">
                <Form.Label>Carrera:</Form.Label>
                <Form.Control
                  name="carrera"
                  as="select"
                  data-testid="carrera"
                  value={values.carrera}
                  onChange={handleChange}
                  disabled={values.externo}
                >
                  <option key={"a"} disabled>
                    Elige una opcion...
                  </option>
                  {carreras.map((carrera: string, index: number) => (
                    <option key={index} value={carrera}>
                      {carrera}
                    </option>
                  ))}
                </Form.Control>
                {touched.carrera && errors.carrera ? (
                  <Alert variant="warning">{errors.carrera}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label id="curso">Curso:</Form.Label>
                <Form.Control
                  aria-labelledby="curso"
                  data-testid="curso"
                  name="curso"
                  as="select"
                  value={values.curso}
                  onChange={handleChange}
                >
                  <option>Selecciona el curso:</option>
                  <option value="en">Inglés</option>
                  <option value="fr">Francés</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="reubicacion">
                <input
                  type="checkbox"
                  name="reubicacion"
                  value={(values.reubicacion as unknown) as string}
                />{" "}
                Reubicacion
              </Form.Group>
              <Button type="submit" variant="primary">
                Enviar
              </Button>
            </Form>
            <Alert variant="warning" style={{ margin: "1em" }}>
              <small>
                Es probable que al finalizar el examen escrito debas hacer un
                examen oral.
              </small>
            </Alert>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default PersonalForm;
