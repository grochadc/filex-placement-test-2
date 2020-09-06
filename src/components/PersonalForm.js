import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import carreras from "../data/carreras";
import { withinOpeningHours } from "../lib";

const InformationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("Obligatorio"),
  firstLastName: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Obligatorio"),
  secondLastName: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Obligatorio"),
  code: Yup.number().min(7, "Codigo muy corto"),
  external: Yup.boolean(),
  phone: Yup.number().min(10, "Numero muy corto"),
  carrera: Yup.string(),
  reubicacion: Yup.boolean(),
  email: Yup.string()
    .email("email no valido")
    .required("Obligatorio"),
  curso: Yup.string().required("Campo Obligatorio")
});

const PersonalForm = ({ handleSubmit }) => {
  const [disableButton, setDisableButton] = useState(true);
  useEffect(() => {
    withinOpeningHours().then(bool => setDisableButton(true));
  });
  return (
    <div>
      <Formik
        validationSchema={InformationSchema}
        initialValues={{
          firstName: "",
          firstLastName: "",
          secondLastName: "",
          code: "",
          external: false,
          phone: "",
          carrera: "",
          reubicacion: false,
          email: "",
          curso: ""
        }}
        onSubmit={values => handleSubmit(values)}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="code">
                <Form.Label>Código:</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  disabled={values.external}
                />
                {touched.code && errors.code ? (
                  <Alert variant="warning">{errors.code}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="external">
                <input
                  type="checkbox"
                  id="external"
                  label="Externo"
                  value={values.external}
                  onChange={handleChange}
                />
                <Form.Label> Externo</Form.Label>
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                {touched.firstName && errors.firstName ? (
                  <Alert variant="warning">{errors.firstName}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="firstLastName">
                <Form.Label>Apellido Paterno:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstLastName"
                  value={values.firstLastName}
                  onChange={handleChange}
                />
                {touched.firstLastName && errors.firstLastName ? (
                  <Alert variant="warning">{errors.firstLastName}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="secondLastName">
                <Form.Label>Apellido Materno:</Form.Label>
                <Form.Control
                  type="text"
                  name="secondLastName"
                  value={values.secondLastName}
                  onChange={handleChange}
                />
                {touched.secondLastName && errors.secondLastName ? (
                  <Alert variant="warning">{errors.secondLastName}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label controlId="phone">Teléfono Celular:</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
                {touched.phone && errors.phone ? (
                  <Alert variant="warning">{errors.phone}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label controlId="email">Correo Electrónico:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email ? (
                  <Alert variant="warning">{errors.email}</Alert>
                ) : null}
              </Form.Group>
              <Form.Group controlId="carrera">
                <Form.Label controlId="carrera">Carrera:</Form.Label>
                <Form.Control
                  name="carrera"
                  as="select"
                  value={values.carrera}
                  onChange={handleChange}
                  disabled={values.external}
                >
                  {carreras.map((carrera, index) => (
                    <option key={index}>{carrera}</option>
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
                  name="curso"
                  as="select"
                  value={values.curso}
                  onChange={handleChange}
                >
                  <option>Selecciona el curso:</option>
                  <option value="english">Inglés</option>
                  <option value="french">Francés</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="reubicacion">
                <input
                  type="checkbox"
                  name="reubicacion"
                  id="reubicacion"
                  value={values.reubicacion}
                />{" "}
                Reubicacion
              </Form.Group>
              <Button type="submit" variant="primary" disabled={disableButton}>
                Enviar
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default PersonalForm;
