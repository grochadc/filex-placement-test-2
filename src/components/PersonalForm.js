import React from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const carreras = ["Agrobiotecnologia", "Derecho", "Medicina"];

const PersonalForm = ({ handleSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          firstLastName: "",
          secondLastName: "",
          code: "",
          external: false,
          phone: "",
          carrera: "",
          reubicacion: "false",
          email: ""
        }}
        onSubmit={values => handleSubmit(values)}
      >
        {({ values, handleSubmit, handleChange }) => (
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
            </Form.Group>
            <Form.Group controlId="firstLastName">
              <Form.Label>Apellido Paterno:</Form.Label>
              <Form.Control
                type="text"
                name="firstLastName"
                value={values.firstLastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="secondLastName">
              <Form.Label>Apellido Materno:</Form.Label>
              <Form.Control
                type="text"
                name="secondLastName"
                value={values.secondLastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label controlId="phone">Teléfono Celular:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label controlId="email">Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
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
                {carreras.map(carrera => (
                  <option key={carrera}>{carrera}</option>
                ))}
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
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalForm;
