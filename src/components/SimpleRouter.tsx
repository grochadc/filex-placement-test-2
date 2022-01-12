import React from "react";

const Router = (props: any) => {
  return (
    <>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { currentPath: props.currentPath })
      )}
    </>
  );
};

export const Route = (props: any) => {
  return <>{props.path === props.currentPath ? <>{props.children}</> : null}</>;
};

export default Router;
