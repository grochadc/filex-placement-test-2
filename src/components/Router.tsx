import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const RouterView = (props: { route: string; children: React.ReactNode }) => {
  const currentRoute = useSelector((state: { route: string }) => state.route);
  return (
    <div>
      {currentRoute === props.route ? (
        <Fragment>{props.children}</Fragment>
      ) : null}
    </div>
  );
};

export default RouterView;
