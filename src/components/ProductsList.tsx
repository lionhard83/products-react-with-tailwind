import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";


export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string; // ISO date string
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

export type ResponseType = {
  products: Product[],
  total: number,
  skip: number,
  limit: number
}

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([])

    const {id} = useParams();
    

    useEffect(() => {
        axios.get<ResponseType>(`https://dummyjson.com/products/category/${id}`)
        .then(response => {
            setProducts(response.data.products);
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
