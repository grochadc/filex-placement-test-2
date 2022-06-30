import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

Yup.addMethod<Yup.StringSchema>(Yup.string, "allowed", function (arr, message) {
  return this.test("isAllowed", message, (value) => {
    return arr.includes(value);
  });
});

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
  codigo: Yup.string().min(7, "Codigo muy corto"),
  genero: Yup.mixed().oneOf(["M", "F"]),
  ciclo: Yup.string().matches(
    /\d{4}(A|B)/,
    "El ciclo debe tener el formato de cuatro digitos para el año y la letra A o B en mayúscula. Ej. 2021A"
  ),
  externo: Yup.boolean(),
  telefono: Yup.number().min(10, "Numero muy corto"),
  carrera: Yup.string(),
  reubicacion: Yup.boolean(),
  email: Yup.string()
    .email(
      "Email no valido. Asegurate de incluir el @ y escribir los .com .mx etc. de forma correcta."
    )
    .required("Obligatorio"),
  curso: Yup.string().required("Campo Obligatorio"),
  institucionalEmail: Yup.string()
    .email(
      "Email no valido. Asegurate de incluir el @ y escribir los .com .mx etc. de forma correcta."
    )
    .matches(
      /[\w\.]*@alumnos.udg.mx/,
      "El correo debe terminar en @alumnos.udg.mx"
    ),
});

export type FormikSchema = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  codigo: string;
  genero: string;
  ciclo: string;
  externo: boolean;
  telefono: string;
  carrera: string;
  reubicacion: boolean;
  email: string;
  institucionalEmail: string;
  curso: string;
};

type FormComponentProps = {
  disabled: boolean;
  carreras: Array<string>;
  onSubmit: (applicantInformation: FormikSchema) => void;
};

const FormComponent = (props: FormComponentProps) => {
  const formik = useFormik({
    initialValues: {
      codigo: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      genero: "M",
      ciclo: "",
      carrera: "Elige una opcion...",
      telefono: "",
      email: "",
      institucionalEmail: "",
      nivel_escrito: 1,
      curso: "",
      externo: false,
      reubicacion: false,
    },
    onSubmit: props.onSubmit,
    validationSchema: InformationSchema,
  });
  return (
    <main>
      <form onSubmit={(e) => formik.handleSubmit(e as any)}>
        <div>
          <label>Código:
          <input
            type="number"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled ? true : false}
          /></label>
        </div>
        <div>
          <label>
            <input 
              type="checkbox"
              value={formik.values.externo as unknown as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.disabled}
              className="mx-2"
              />
            Externo (No soy alumno CUSur)
          </label>
          <span>{formik.values.externo ? "Si eres externo usa tu telefono en lugar de codigo" : null}</span>
        </div>
          <button className="mt-1">Buscar mi Información</button>
          <div>
          {formik.touched.codigo && formik.errors.codigo ? (
            <Alert variant="warning">{formik.errors.codigo}</Alert>
          ) : null}
        </div>
        <div>
          <label>Nombre:
          <input
            type="text"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          </label>
          {formik.touched.nombre && formik.errors.nombre ? (
            <Alert variant="warning">{formik.errors.nombre}</Alert>
          ) : null}
        </div>
        <Form.Group controlId="apellido_paterno">
          <Form.Label>Apellido Paterno:</Form.Label>
          <Form.Control
            type="text"
            name="apellido_paterno"
            value={formik.values.apellido_paterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.apellido_paterno && formik.errors.apellido_paterno ? (
            <Alert variant="warning">{formik.errors.apellido_paterno}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group controlId="apellido_materno">
          <Form.Label>Apellido Materno:</Form.Label>
          <Form.Control
            type="text"
            name="apellido_materno"
            value={formik.values.apellido_materno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.apellido_materno && formik.errors.apellido_materno ? (
            <Alert variant="warning">{formik.errors.apellido_materno}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Género:</Form.Label>
          <Form.Control
            name="genero"
            as="select"
            value={formik.values.genero}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          >
            <option value="M">M</option>
            <option value="F">F</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono Celular:</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.telefono && formik.errors.telefono ? (
            <Alert variant="warning">{formik.errors.telefono}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="emailLabel">Correo Electrónico:</Form.Label>
          <Form.Control
            id="emailLabel"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert variant="warning">{formik.errors.email}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="institucionalEmailLabel">
            Correo institucional (@alumnos.udg.mx) [Opcional]
          </Form.Label>
          <Form.Control
            id="institucionalEmailLabel"
            type="email"
            name="institucionalEmail"
            value={formik.values.institucionalEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.institucionalEmail &&
          formik.errors.institucionalEmail ? (
            <Alert variant="warning">{formik.errors.institucionalEmail}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="cicloLabel">
            Ciclo de ingreso a CUSur (ej: 2021A):
          </Form.Label>
          <Form.Control
            id="cicloLabel"
            type="text"
            name="ciclo"
            value={formik.values.ciclo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.ciclo && formik.errors.ciclo ? (
            <Alert variant="warning">{formik.errors.ciclo}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group controlId="carrera">
          <Form.Label>Carrera:</Form.Label>
          <Form.Control
            name="carrera"
            as="select"
            data-testid="carrera"
            value={formik.values.carrera}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled ? true : formik.values.externo}
          >
            <option key={"a"} disabled>
              Elige una opcion...
            </option>
            {props.carreras.map((carrera: string) => (
              <option key={carrera} value={carrera}>
                {carrera}
              </option>
            ))}
          </Form.Control>
          {formik.touched.carrera && formik.errors.carrera ? (
            <Alert variant="warning">{formik.errors.carrera}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label id="curso">Curso:</Form.Label>
          <Form.Control
            aria-labelledby="curso"
            data-testid="curso"
            name="curso"
            as="select"
            value={formik.values.curso}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
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
            value={formik.values.reubicacion as unknown as string}
            disabled={props.disabled}
          />{" "}
          Reubicacion
        </Form.Group>
        <Button type="submit" variant="primary" disabled={props.disabled}>
          Enviar
        </Button>
      </form>
    </main>
  );
};

export default FormComponent;
