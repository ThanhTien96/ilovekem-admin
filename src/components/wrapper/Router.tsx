import React from 'react';
import { AppLayout } from "components/Layout";
import routes from "configs/routes";
import { BrowserRouter, Navigate, RouteObject, useRoutes } from "react-router-dom";
import { LoadingPage } from 'pages';

export interface RouterProps {
  defaultRoute: string;
}

export const Routes = (props: RouterProps) => {
  const { defaultRoute } = props;
  const defaultRouteObject: RouteObject = {
    index: true,
    path: "/",
    element: <Navigate to={defaultRoute} />,
  };
  const elements = useRoutes([defaultRouteObject, ...routes]);

  return (
    <React.Suspense 
    fallback={
        <AppLayout>
            <LoadingPage />
        </AppLayout>
    }
    >
        {elements}
    </React.Suspense>
  )
}

// router browser
const Router = (props: RouterProps) => {
    return (
        <BrowserRouter>
            <Routes {...props} />
        </BrowserRouter>
    )
}

export default Router;
