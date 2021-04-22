import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: any) => {
  const authDetails = localStorage.getItem('AUTH_INFO');

  const routeComponent = (props: any) =>
    authDetails ? (
      React.createElement(Component, props)
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
