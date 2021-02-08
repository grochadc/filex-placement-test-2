import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
export const Loading = () => <span>Loading...</span>;
export const Error = (props: { error: any }) => (
  <span>{JSON.stringify(props.error)}</span>
);

export const Header = (props: { children: any }) => (
  <Jumbotron>
    <h1>EXAMEN DE UBICACION FILEX</h1>
    {props.children}
  </Jumbotron>
);
