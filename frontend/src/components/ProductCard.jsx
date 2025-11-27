import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.category}</p>
          <p className="text-primary font-bold mt-2">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
