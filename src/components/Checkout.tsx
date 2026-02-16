'use client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setQuantity } from '../redux/cart/cartSlice';



export const Checkout  = () => {
    const {value: productsInCart} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    return (<>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium text-gray-900">Shopping cart</p>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                            //   onClick={() => dispatch(setOpen(false))}
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                          </div>
                        </div>
    
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {productsInCart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img alt={product.title} src={product.images[0]} className="size-full object-cover" />
                                  </div>
    
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link to={'/products/' + product.id}>{product.title}</Link>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{"red"}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <select value={product.quantity} onChange={(event) => {dispatch(setQuantity({productId: product.id, quantity: Number(event.target.value)}))}}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => <option>{item}</option>)}
                                        </select>
                                      {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
    
                                      <div className="flex">
                                        {/* <button onClick={() => dispatch(removeProduct(product))} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                          Remove
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      
    
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{productsInCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}€</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              onClick={() => dispatch(setOpen(false))}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div> */}
                      </div>
               </div>
               </div>
            </>)
}