import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";


type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;   // ISO date string
  updatedAt: string;    // ISO date string
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;   // ISO date string
  updatedAt: string;    // ISO date string (se esiste nel tuo JSON reale)
};

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([])

    const {id} = useParams();
    

    useEffect(() => {
        axios.get<Product[]>(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
        .then(response => {
            setProducts(response.data);
        })

    }, [id])
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to={'/products/' + product.id} className="group">
                <img
                    alt={product.title}
                    src={product.images[0]}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}€</p>
            </Link>
            
          ))}
        </div>
      </div>
    </div>
  )
}
