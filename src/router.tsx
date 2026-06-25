import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ProductView from "./views/ProductView.tsx"; // Assuming this is where you made it!

// We export the created router directly as a named export
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product/:id",
    element: <ProductView />,
  },
]);