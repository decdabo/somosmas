import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = true;
  return (
    <>
      {isAuthenticated ? (
        <Route {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login-form",
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
