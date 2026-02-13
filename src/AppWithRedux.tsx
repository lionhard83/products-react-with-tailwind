import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import Navbar from "./components/Navbar";
// import { Cart } from "./components/Cart";
import SingleProduct from "./components/SingleProduct";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import { Example } from "./components/Example";
import { Cart } from "./components/Cart";



// type ProductWithQty = Product & {quantity: number}

export const AppWithRedux = () => {

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}>
            <Navbar  />
            <Example />
            <Cart>
                <Outlet />
            </Cart>
      </Provider>
    ,
    children: [
      { index: true, element: <p>Sono nella home page</p>},
      { path: "/products", Component: ProductsList },
      { path: "/products/categories/:id", Component: ProductsList },
      { path: "/products/:id", Component: SingleProduct },
      
    ],
  },
]);

  return (
    <RouterProvider router={router} />
  )
}


