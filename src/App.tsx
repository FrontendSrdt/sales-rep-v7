import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { routes } from "./util/AllRoutes";

function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
