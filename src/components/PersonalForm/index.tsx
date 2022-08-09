import React, {useState} from "react";
import Alert from "react-bootstrap/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

//import * as tw from "tailwind-styled-components";

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

const ControlGroup = ({children}: any) => <div className="flex flex-col my-3 w-full">{children}</div>
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
  const findInfo = (codigo: string) => {
    setFindingInfo(true);
      return (new Promise((resolve) => {
        setTimeout(() => resolve(null), 2000);
      }));
  };
  const [findingInfo, setFindingInfo] = useState(false);
  return (
    <div>
      <form onSubmit={(e) => formik.handleSubmit(e as any)}>
        <ControlGroup>
          <div><label htmlFor="codigo">Código:</label></div>
          <input
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
        </ControlGroup>
          <button 
            className="my-1" 
            onClick={() => findInfo(formik.values.codigo).then(() => setFindingInfo(false))}
          >
            Buscar mis datos
          </button>
          {findingInfo ? <Alert variant="primary">Buscando tus datos...</Alert> : null}
          <div>
          {formik.touched.codigo && formik.errors.codigo ? (
            <Alert variant="warning">{formik.errors.codigo}</Alert>
          ) : null}
        </div>
        <ControlGroup>
          <div><label htmlFor="nombre">Nombre:</label></div>
          <input
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
          <label htmlFor="apellido_paterno">Apellido Paterno:</label>
          <input
            type="text"
            id="apellido_paterno"
            value={formik.values.apellido_paterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.apellido_paterno && formik.errors.apellido_paterno ? (
            <Alert variant="warning">{formik.errors.apellido_paterno}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="apellido_materno">Apellido Materno:</label>
          <input
            type="text"
            id="apellido_materno"
            value={formik.values.apellido_materno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          />
          {formik.touched.apellido_materno && formik.errors.apellido_materno ? (
            <Alert variant="warning">{formik.errors.apellido_materno}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="genero">Género:</label>
          <select
            style={{display: "block"}}
            id="genero"
            value={formik.values.genero}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.disabled}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="NB">No Binario</option>
          </select>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="telefono">Teléfono Celular:</label>
          <input
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
          <input
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
          <input
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
          <label htmlFor="ciclo_ingreso">
            Ciclo de ingreso a CUSur (ej: 2021A):
          </label>
          <input
            id="ciclo_ingreso"
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
          <select
            style={{display: "block"}}
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
          </select>
          {formik.touched.carrera && formik.errors.carrera ? (
            <Alert variant="warning">{formik.errors.carrera}</Alert>
          ) : null}
        </ControlGroup>
        <ControlGroup>
          <label id="curso">Idioma:</label>
          <select
            style={{display: "block"}}
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
          </select>
        </ControlGroup>
        <button type="submit" disabled={props.disabled}>
          Iniciar Exámen
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
