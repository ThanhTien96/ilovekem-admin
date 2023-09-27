import { RouteObject, Outlet, Navigate } from "react-router-dom";
import {  NoAuthorizedPage, NotFoundPage,  } from "pages";
import React from "react";
import pagePaths from "constants/pagePath";
import { AppLayout } from "components/Layout";
import { StoreState, useAppSelector } from "reduxStore";


const Home = React.lazy(() => import('pages/HomePage'))
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const ProductPage = React.lazy(() => import('pages/ProductsPage'));
const AddProduct = React.lazy(() => import('pages/AddProductPage'));
const UpdateProductPage = React.lazy(() => import('pages/UpdateProductPage'));
const PostPage = React.lazy(() => import('pages/PostPage'));
const AccountPage = React.lazy(() => import('pages/AccountPage'));

export interface PrivateRouteProps {
  renderIfTrue?: (state: StoreState) => boolean;
  children: React.ReactElement;
  fallBackComponent?: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const {
    renderIfTrue,
    children,
    fallBackComponent = <NoAuthorizedPage />,
  } = props;
  const store = useAppSelector((store) => store);
  if ((renderIfTrue && renderIfTrue(store)) || !renderIfTrue) {
    return children;
  }

  return fallBackComponent;
};

const extendedRoutes: RouteObject[] = [
  {
    index: true,
    path: pagePaths.home,
    element: <Home />,
  },
  {
    path: pagePaths.product,
    element: <ProductPage />,
  },
  {
    path: pagePaths.addProduct,
    element: <AddProduct />
  },
  {
    path: pagePaths.updateProduct,
    element: <UpdateProductPage />
  },
  {
    path: pagePaths.post,
    element: <PostPage />
  }, 
  {
    path: pagePaths.account,
    element: <AccountPage />
  }
];

const routes: RouteObject[] = [
  {
    path: pagePaths.default,
    element: (
      <PrivateRoute
        renderIfTrue={(state) => state.common.userSlice.profile ? true : false}
        fallBackComponent={<Navigate to={"/login"} />}
      >
      <AppLayout>
        <Outlet />
      </AppLayout>
      </PrivateRoute>
    ),
    children: [
      ...extendedRoutes,
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    index: true,
    path: pagePaths.login,
    element: <LoginPage />
  }
];
 
export default routes;
