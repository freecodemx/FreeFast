import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { Link } from 'react-router-dom';
import ProductCard from "../components/ProductCard";

function ProductsPage() {
    const { getProducts, products } = useProduct();
    const [filterPrice, setFilterPrice] = useState("");
    const [filterName, setFilterName] = useState("");
    useEffect(() => {
        getProducts();
    }, []);
    const filteredProducts = products.filter((product) => {
        return (
            (filterPrice === "" || product.precio.includes(filterPrice)) &&
            (filterName === "" || product.nombre.toLowerCase().includes(filterName.toLowerCase()))
        );
    });
    if (filteredProducts.length === 0) return <h1>Sin productos</h1>;
    return (
        <div>
            <div className="flex flex-wrap gap-4 border p-4 rounded-lg mb-4">
                <div className="flex items-center">
                    <label htmlFor="filterPrice" className="block text-white mr-2">
                        Filtrar por Precio:
                    </label>
                    <input
                        type="text"
                        id="filterPrice"
                        className="rounded-lg p-1"
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="filterName" className="block text-white mr-2">
                        Filtrar por Nombre:
                    </label>
                    <input
                        type="text"
                        id="filterName"
                        className="rounded-lg p-1"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>
                <div className="flex items-right text-right">
                    <Link
                        to="/products/new"
                        className="text-white bg-blue-900 hover:bg-blue-800 px-2 py-1 rounded-lg block md:inline-block"
                    >
                        + Nuevo Producto
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="col-span-1">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductsPage;
