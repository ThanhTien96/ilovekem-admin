import { RouteObject, Outlet } from "react-router-dom";
import { NotFoundPage,  } from "pages";
import React from "react";
import pagePaths from "constants/pagePath";
import { AppLayout } from "components/Layout";


const Home = React.lazy(() => import('pages/HomePage'))
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const ProductPage = React.lazy(() => import('pages/ProductsPage'));
const AddProduct = React.lazy(() => import('pages/AddProductPage'));
const UpdateProductPage = React.lazy(() => import('pages/UpdateProductPage'))
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
  }
];

const routes: RouteObject[] = [
  {
    path: pagePaths.default,
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
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
    path: pagePaths.login,
    element: <LoginPage />
  }
];
 
export default routes;
