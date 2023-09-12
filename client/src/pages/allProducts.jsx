import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useNotifications } from "../context/NotificationContext";
import { Link } from 'react-router-dom';
import ProductCard from "../components/ProductCard";

function AllProducts() {
    const { getAllProducts, products, sendProduct, acceptProduct } = useProduct();
    const { user } = useAuth(); // Obtiene el usuario autenticado del contexto de autenticación
    const { addNotification } = useNotifications();
    const [filterPrice, setFilterPrice] = useState("");
    const [filterName, setFilterName] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        getAllProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        return (
            (filterPrice === "" || product.precio.includes(filterPrice)) &&
            (filterName === "" || product.nombre.toLowerCase().includes(filterName.toLowerCase()))
        );
    });

    const handleSendRequest = (product) => {
        if (user) {
            // Enviar solicitud al vendedor
            const data = {
                productId: product._id,
                userId: user.id,
            };

            // Llama a la ruta del backend para solicitar el producto
            sendProduct(data)
                .then((response) => {
                    console.log(response.message);
                    setSelectedProduct(product);

                    // Enviar notificación al comprador
                    const message = `Has solicitado el producto: ${product.nombre}`;
                    addNotification(message); // Utiliza addNotification para enviar la notificación
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const handleAcceptRequest = () => {
        if (selectedProduct) {
            // Marcar el producto como "Entregado"
            const data = {
                productId: selectedProduct._id,
            };

            // Llama a la ruta del backend para aceptar la solicitud
            acceptProduct(data)
                .then((response) => {
                    console.log(response.message);
                    setSelectedProduct(null);

                    // Enviar notificación al comprador
                    const message = `El producto "${selectedProduct.nombre}" ha sido entregado.`;
                    addNotification(message); // Utiliza addNotification para enviar la notificación

                    // Actualizar la lista de productos
                    getAllProducts();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

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
                        {product.estatus === 'Solicitado' ? (
                            user.tipo === 'Vendedor' ? (
                                <Link
                                    to={`/products/${product._id}`}
                                    className="bg-blue-300 hover:bg-blue-300 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                                >
                                    <button
                                        onClick={() => handleAcceptRequest(product)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                    >
                                        Aceptar Solicitud
                                    </button>
                                </Link>
                            ) : user.tipo === 'Comprador' ? (
                                <button
                                    onClick={() => handleSendRequest(product)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                >
                                    Solicitar Producto
                                </button>
                            ) : user.tipo === 'Administrador' ? (
                                // Agregar aquí el código específico para el tipo de usuario 'Administrador'
                                <button
                                    onClick={() => (product)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-green active:bg-green-800"
                                >
                                    Acción de Administrador
                                </button>
                            ) : (
                                // Otros tipos de usuario si es necesario
                                null
                            )
                        ) : product.estatus === 'Entregado' ? (
                            // Bloque de código si product.estatus es 'Entregado'
                            <button
                                className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed"
                                disabled
                            >
                                Producto Entregado
                            </button>
                        ) : (
                            // Bloque de código si product.estatus no es 'Solicitado' ni 'Entregado'
                            null
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AllProducts;
