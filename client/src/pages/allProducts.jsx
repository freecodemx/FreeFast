import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function AllProducts() {
    const { getAllProducts, products } = useProduct();
    const [filterPrice, setFilterPrice] = useState("");
    const [filterName, setFilterName] = useState("");
    const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        getAllProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        return (
            (filterPrice === "" || product.precio.includes(filterPrice)) &&
            (filterName === "" || product.nombre.toLowerCase().includes(filterName.toLowerCase())) &&
            (filterDate === "" || product.createdAt.includes(filterDate))
        );
    });

    if (filteredProducts.length === 0) return <h1>Sin productos</h1>;

    return (
        <div>
            <div className="flex flex-wrap gap-4 border p-4 rounded-lg mb-4 small-container">
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="filterPrice" className="block text-white mb-2">
                        Filtrar por Precio:
                    </label>
                    <input
                        type="text"
                        id="filterPrice"
                        className="rounded-lg p-1 w-full"
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="filterName" className="block text-white mb-2">
                        Filtrar por Nombre:
                    </label>
                    <input
                        type="text"
                        id="filterName"
                        className="rounded-lg p-1 w-full"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="filterDate" className="block text-white mb-2">
                        Filtrar por Fecha:
                    </label>
                    <input
                        type="text"
                        id="filterDate"
                        className="rounded-lg p-1 w-full"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="col-span-1">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;
