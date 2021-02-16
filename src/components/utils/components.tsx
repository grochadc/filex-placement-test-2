import React from "react";
import Alert from "react-bootstrap/Alert";

export const Error = ({ children }: { children: any }) => (
  <Alert>{children}</Alert>
);

export const Loading = () => <div>Cargando...</div>;
