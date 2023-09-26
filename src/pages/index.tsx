import ErrorPage from "./ErrorPage";

export const NotFoundPage = ErrorPage[404];
export const ServerErrorPage = ErrorPage[500];
export const NoAuthorizedPage = ErrorPage[403];

export {default as HomePage} from './HomePage';
export {default as LoginPage} from './LoginPage'
export {default as LoadingPage} from './LoadingPage';
export {default as ProductPage} from './ProductsPage';
export {default as AddProductPage} from './AddProductPage';
export {default as UpdateProductPage} from './UpdateProductPage';
export {default as PostPage} from './PostPage';
export {default as AccountPage} from './AccountPage';