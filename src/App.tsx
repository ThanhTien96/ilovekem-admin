import { ConfigProvider, Router, StoreProvider } from "./components/wrapper";
import "./styles/App.less";
import pagePaths from "./constants/pagePath";

function App() {
  
  return (
    <StoreProvider>
      <ConfigProvider>
        <Router defaultRoute={pagePaths.home} />
      </ConfigProvider>
    </StoreProvider>
  );
}

export default App;
