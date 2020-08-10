import React from "react";
import { Formik, Field } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const carreras = ['Agrobiotecnologia', 'Derecho', 'Medicina'];

const PersonalForm = ({handleSubmit}) => {
  return (
    <div>
    <Formik
      initialValues={{ firstName: '', firstLastName: '', secondLastName: '', code: '', phone: '', carrera:'', reubicacion: "false"}}
      onSubmit={values => handleSubmit(values)}
      >
    {({values, handleSubmit, handleChange}) => (
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="code">
        <Form.Label>Codigo:</Form.Label>
        <Form.Control type="text" name="code" value={values.code} onChange={handleChange}/>
      </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" name="firstName" value={values.firstName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="firstLastName">
          <Form.Label>Apellido Materno:</Form.Label>
          <Form.Control type="text" name="firstLastName" value={values.firstLastName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="secondLastName">
          <Form.Label>Apellido Paterno:</Form.Label>
          <Form.Control type="text" name="secondLastName" value={values.secondLastName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label controlId="phone">Telefono Celular:</Form.Label>
          <Form.Control type="text" name="phone" value={values.phone} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="carrera">
          <Form.Label controlId="carrera">Carrera:</Form.Label>
          <Form.Control name="carrera" as="select" value={values.carrera} onChange={handleChange}>
            {carreras.map(carrera => <option key={carrera}>{carrera}</option>)}
          </Form.Control>
        </Form.Group>
        <div><Field type="checkbox" name="reubicacion" value={values.reubicacion} /> Reubicacion</div>
        <Button type="submit" variant="primary">Enviar</Button>
      </Form>
    )}
    </Formik>
    </div>)
}


export default PersonalForm;
