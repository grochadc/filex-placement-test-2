import React from "react";
import Alert from "react-bootstrap/Alert";

type ErrorProps = { e: any };
export const Error = (props: ErrorProps) => (
  <pre className="w-screen" id="error">
    {JSON.stringify(props.e, undefined, 2)}
  </pre>
);

export const Loading = () => <div>Cargando...</div>;
