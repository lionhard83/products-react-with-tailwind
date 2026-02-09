// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductsList, { type Product } from "./components/ProductsList";
import Navbar from "./components/Navbar";
import { Cart } from "./components/Cart";
import { createContext, useState } from "react";
import SingleProduct from "./components/SingleProduct";

// eslint-disable-next-line react-refresh/only-export-components
export const ContextCart = createContext<ProductWithQty[]>([])
// eslint-disable-next-line react-refresh/only-export-components
export const ContextAddInCart = createContext<(((product: Product, remove?: boolean) => void) | null)>(null);

type ProductWithQty = Product & {quantity: number}

export const App = () => {
  
  const [open, setOpen] = useState(false);
  const changeInCart = (product: Product, remove?: boolean) => {
      if (remove) {
        setProductsInCart([...productsInCart.filter(item => item.id !== product.id)]);
      } else {
        const productInCart = productsInCart.find(item => item.id === product.id);
        if (productInCart) {
          productInCart.quantity++;
        }
        else productsInCart.push({...product, quantity : 1});
        setProductsInCart([...productsInCart]);
      }
      setOpen(true);
  }
  const [productsInCart, setProductsInCart] = useState<ProductWithQty[]>([]);

  const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextAddInCart.Provider value={changeInCart}>
        <ContextCart.Provider value={productsInCart}>
          <Navbar openCart={setOpen} />
          <Cart open={open} setOpen={setOpen}>
            <Outlet />
          </Cart>
      </ContextCart.Provider>
    </ContextAddInCart.Provider>
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


