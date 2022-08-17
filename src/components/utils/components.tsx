import React from "react";

type ErrorProps = { e: any };
export const Error = (props: ErrorProps) => (
  <div className="w-screen border border-black rounded p-4">
    <pre id="error">{JSON.stringify(props.e, undefined, 2)}</pre>
  </div>
);



export const Loading = () => <div>Cargando...</div>;
