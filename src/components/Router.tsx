import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";

const RouterView = (props: { route: string; children: React.ReactNode }) => {
  const currentRoute = useSelector((state: RootState) => state.system.route);
  return (
    <div>
      {currentRoute === props.route ? (
        <Fragment>{props.children}</Fragment>
      ) : null}
    </div>
  );
};

export default RouterView;
