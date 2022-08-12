import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

import tw from "tailwind-styled-components";
const StyledInput = tw.input`border border-black p-2 m-2`;
const StyledButton = tw.button`border border-black bg-blue-600 p-2 rounded text-white`;
const StyledSelect = tw.select`border-black p-2 m-2`;

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
  apellidoPaterno: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Obligatorio"),
  apellidoMaterno: Yup.string()
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
  apellidoPaterno: string;
  apellidoMaterno: string;
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

const ControlGroup = ({ children }: any) => (
  <div className="flex flex-col my-3 w-full">{children}</div>
);
const FormComponent = (props: FormComponentProps) => {
  const formik = useFormik({
    initialValues: {
      codigo: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
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
  const findInfo = (codigo: string) => {
    setFindingInfo(true);
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 2000);
    });
  };
  const [findingInfo, setFindingInfo] = useState(false);
  return (
    <div>
      <form onSubmit={(e) => formik.handleSubmit(e as any)}>
        <ControlGroup>
          <div>
            <label htmlFor="codigo">Código:</label>
          </div>
          <StyledInput
            className="border border-black"
            id="codigo"
            type="text"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled ? true : false}
          />
        </ControlGroup>
        <ControlGroup>
          <label>
            <StyledInput
              type="checkbox"
              value={formik.values.externo as unknown as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.disabled}
              className="mx-2"
            />
            Externo (No soy alumno CUSur)
          </label>
          <span>
            {formik.values.externo
              ? "Si eres externo usa tu telefono en lugar de codigo"
              : null}
          </span>
        </ControlGroup>
        <StyledButton
          className="my-1"
          onClick={() =>
            findInfo(formik.values.codigo).then(() => setFindingInfo(false))
          }
        >
          Buscar mis datos
        </StyledButton>
        {findingInfo ? (
          <Alert variant="primary">Buscando tus datos...</Alert>
        ) : null}
        <div>
          {formik.touched.codigo && formik.errors.codigo ? (
            <Alert variant="warning">{formik.errors.codigo}</Alert>
          ) : null}
        </div>
        <ControlGroup>
          <div>
            <label htmlFor="nombre">Nombre:</label>
          </div>
          <StyledInput
            type="text"
            id="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.nombre && formik.errors.nombre ? (
            <Alert variant="warning">{formik.errors.nombre}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
          <StyledInput
            type="text"
            id="apellidoPaterno"
            value={formik.values.apellidoPaterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.apellidoPaterno && formik.errors.apellidoPaterno ? (
            <Alert variant="warning">{formik.errors.apellidoPaterno}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="apellidoMaterno">Apellido Materno:</label>
          <StyledInput
            type="text"
            id="apellidoMaterno"
            value={formik.values.apellidoMaterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.apellidoMaterno && formik.errors.apellidoMaterno ? (
            <Alert variant="warning">{formik.errors.apellidoMaterno}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="genero">Género:</label>
          <StyledSelect
            style={{ display: "block" }}
            id="genero"
            value={formik.values.genero}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="NB">No Binario</option>
          </StyledSelect>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="telefono">Teléfono Celular:</label>
          <StyledInput
            id="telefono"
            type="tel"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.telefono && formik.errors.telefono ? (
            <Alert variant="warning">{formik.errors.telefono}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="email">Correo Electrónico:</label>
          <StyledInput
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert variant="warning">{formik.errors.email}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="institucionalEmail">
            Correo institucional (@alumnos.udg.mx)
          </label>
          <StyledInput
            id="institucionalEmail"
            type="email"
            value={formik.values.institucionalEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.institucionalEmail &&
          formik.errors.institucionalEmail ? (
            <Alert variant="warning">{formik.errors.institucionalEmail}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="ciclo">Ciclo de ingreso a CUSur (ej: 2021A):</label>
          <StyledInput
            id="ciclo"
            type="text"
            value={formik.values.ciclo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.ciclo && formik.errors.ciclo ? (
            <Alert variant="warning">{formik.errors.ciclo}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="carrera">Carrera:</label>
          <StyledSelect
            style={{ display: "block" }}
            id="carrera"
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
          </StyledSelect>
          {formik.touched.carrera && formik.errors.carrera ? (
            <Alert variant="warning">{formik.errors.carrera}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label id="curso">Idioma:</label>
          <StyledSelect
            style={{ display: "block" }}
            id="curso"
            aria-labelledby="curso"
            data-testid="curso"
            value={formik.values.curso}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          >
            <option>Selecciona el idioma:</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </StyledSelect>
        </ControlGroup>
        <StyledButton type="submit" disabled={props.disabled}>
          Iniciar Exámen
        </StyledButton>
      </form>
    </div>
  );
};

export default FormComponent;
