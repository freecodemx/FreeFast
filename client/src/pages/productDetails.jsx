import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProductDetailPage() {
    const { id } = useParams();
    const { getProductById, updateProduct, createProduct } = useProduct();
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
        navigate(`/product/detail/${data._id}`); // Usar la interpolación de la ruta aquí
    });
    

    if (!product) {
        return <p className="text-red-500">Producto no encontrado.</p>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Detalles del producto {product.nombre}</h2>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="font-semibold">Nombre:</div>
                    <div>{product.nombre}</div>
                    <div className="font-semibold">Precio:</div>
                    <div>${product.precio}</div>
                    <div className="font-semibold">Categoría:</div>
                    <div>{product.categoria}</div>
                    <div className="font-semibold">Disponible:</div>
                    <div>{product.disponible ? "Sí" : "No"}</div>
                    <div className="font-semibold">Fabricante:</div>
                    <div>{product.fabricante}</div>
                    <div className="font-semibold">Número de Existencias:</div>
                    <div>{product.numero_existencias}</div>
                    <div className="font-semibold">Estatus:</div>
                    <div>{product.estatus}</div>
                    {/* Agrega más detalles del producto si es necesario */}
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default ProductDetailPage;
