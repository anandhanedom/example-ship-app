import "./App.scss";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import pages from "./components/pages";
import { parse } from "querystring";

// Components
import Header from "./components/Header";
import SideNav from "./components/SideNav";

// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const ShipmentsListPage = lazy(() => import("./pages/ShipmentsListPage"));
const ShipmentPage = lazy(() => import("./pages/ShipmentPage"));

const ConfirmPrompt = lazy(() => import("./components/ConfirmPrompt"));

// Check if user groups has access to roles defined
const userHasAccess = (path, userGroups) =>
  pages
    .find(page => page.path === path.split("/")[1])
    .groups.some(group => userGroups.some(userGroup => userGroup === group));

const ProtectedRoute = ({ path, component, ...props }) => {
  const location = useLocation();
  let propObject = parse(location.search.slice(1));
  const accessor = useSelector(state => state.accessor.accessor);
  const userGroups = accessor && accessor.groups;

  // Wait for groups
  if (!userGroups) return <>Waiting to sign you in</>;
  // Authenticated user -> go to route, while waiting for group
  else if (
    accessor &&
    !accessor.deactivatedAt &&
    (path === "/" || userHasAccess(path, userGroups))
  )
    return (
      <div>
        <Header />
        <SideNav>
          <Route exact path={path} component={component} {...props} />
        </SideNav>
      </div>
    );
  else if (accessor && accessor.deactivatedAt) return <ErrorPage />;
  // Unauthenticated user -> go to login path, but redirect to requested page once logged in
  else if (accessor) {
    // dispatch(showErrorAlert("You don't have access to this page"));
    return <Redirect to="/" />;
  } else {
    return (
      <Redirect
        to={`/login?redirect=${path.slice(1, 100)}${Object.entries(propObject)
          .map(([key, value]) => `&${key}=${value}`)
          .join("")}`}
      />
    );
  }
};

function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute
          exact
          path="/shipments/:waybillNumber"
          component={ShipmentPage}
        />
        <ProtectedRoute exact path="/shipments" component={ShipmentsListPage} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <Route path="*" component={ErrorPage} />
      </Switch>

      <ConfirmPrompt />
    </div>
  );
}

export default App;
