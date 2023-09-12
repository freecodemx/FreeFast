import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProductDetailPage() {
    const { id } = useParams();
    const { getProductById, updateProduct, createProduct, acceptProduct } = useProduct(); // Agrega acceptProduct
    const product = getProductById(id);
    const { setValue, handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            if (product) {
                console.log(product);
                setValue('nombre', product.nombre)
                setValue('precio', product.precio)
                setValue('categoria', product.categoria)
                setValue('disponible', product.disponible)
                setValue('fabricante', product.fabricante)
                setValue('numero_existencias', product.numero_existencias)
                setValue('estatus', product.estatus)
            }
        }
        loadProduct();
    }, [product, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        if (data._id) {
            updateProduct(data._id, data);
        } else {
            createProduct(data);
        }
        navigate(`/aceptado`);
    });

    // Función para manejar la aceptación del producto
    const handleAcceptProduct = () => {
        if (product && product._id) {
            acceptProduct({ productId: product._id });
            // Después de aceptar el producto, puedes realizar otras acciones si es necesario
        }
    };

    if (!product) {
        return <p className="text-red-500">Producto no encontrado.</p>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Detalles del producto {product.nombre}</h2>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* ... (detalles del producto) ... */}
                    <div className="font-semibold">Estatus:</div>
                    <div>{product.estatus}</div>
                </div>
                <button
                
                type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Guardar
                </button>
            </form>

            {/* Botón para aceptar el producto */}
            {product.estatus === 'Solicitado' && (
                <button
                    onClick={handleAcceptProduct}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Aceptar Producto
                </button>
            )}
        </div>
    );
}

export default ProductDetailPage;
