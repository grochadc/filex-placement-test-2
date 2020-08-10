import React, {Fragment} from 'react';


const Router = ({route, children}) => {
  return React.Children.map(children, (child) => (React.cloneElement(child, {currentRoute: route})))
}

const Show = ({ route, currentRoute, children }) => <div>{currentRoute === route  ? <Fragment>{children}</Fragment> : null}</div>;


export { Router, Show };
