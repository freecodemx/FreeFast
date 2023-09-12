import { useParams, useNavigate, Link } from "react-router-dom";
//import { useSection } from "../context/SectionContext"; 
import { useProduct } from "../context/ProductContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function ProductsSectionPage() {
    const { id } = useParams();
    const { getProductsBySectionId,getAllProducts, updateProduct, createProduct } = useProduct();
   // const { sections } = useSection();
    const products = getProductsBySectionId(id);
    const { setValue, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        async function loadProduct() {
            if (products.length > 0 && selectedProduct === null) {
                const firstProduct = products[0];
                setSelectedProduct(firstProduct);
                setValue('nombre', firstProduct.nombre);
                setValue('precio', firstProduct.precio);
                setValue('categoria', firstProduct.categoria);
                setValue('disponible', firstProduct.disponible);
                setValue('fabricante', firstProduct.fabricante);
                setValue('numero_existencias', firstProduct.numero_existencias);
                setValue('estatus', firstProduct.estatus);
            }
        }
        loadProduct();
    }, [products, setValue, selectedProduct]);

    const onSelectProduct = (product) => {
        // Cambiar el estatus a "Cerrado" al hacer clic en "Seleccionar"
        const updatedProduct = {
            ...product,
            estatus: "Cerrado",
        };
        setSelectedProduct(updatedProduct);
        setValue('nombre', updatedProduct.nombre);
        setValue('precio', updatedProduct.precio);
        setValue('categoria', updatedProduct.categoria);
        setValue('disponible', updatedProduct.disponible);
        setValue('fabricante', updatedProduct.fabricante);
        setValue('numero_existencias', updatedProduct.numero_existencias);
        setValue('estatus', updatedProduct.estatus);
    };

    const onSubmit = handleSubmit(async (data) => {
        if (data._id) {
            updateProduct(data._id, data);
        } else {
            createProduct(data);
        }
        navigate(`/product/detail/${data._id}`);
    });

    if (products.length === 0) {
        return <p className="text-red-500">Productos no encontrados.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-3xl text-center font-bold text-indigo-700 mb-8">Detalles de Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                    <div key={product._id} className={`p-6 rounded-lg shadow-md ${selectedProduct === product ? 'bg-indigo-200' : 'bg-white'}`}>
                        <h3 className="text-2xl font-semibold text-indigo-600">{product.nombre}</h3>
                        <p className="text-gray-500">${product.precio}</p>
                        <p className="text-gray-600">Categoría: {product.categoria}</p>
                        <p className="text-gray-600">Disponible: {product.disponible ? "Sí" : "No"}</p>
                        <p className="text-gray-600">Fabricante: {product.fabricante}</p>
                        <p className="text-gray-600">Número de Existencias: {product.numero_existencias}</p>
                        <p className="text-gray-600">Estatus: {product.estatus}</p>
                        <button
                            onClick={() => onSelectProduct(product)}
                            className={`mt-4 px-4 py-2 rounded-md ${selectedProduct === product ? 'bg-blue-300' : 'bg-indigo-700 hover:bg-indigo-800'}`}
                        >
                            Seleccionar
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={onSubmit} className="mt-8">
                {/* Agrega los campos de entrada para editar el producto */}
                {/* ... */}
                <button type="submit" className="text-center bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition duration-300 ease-in-out">
                <Link
                    to={`/sections`}
                    className="bg-blue-300 hover:bg-blue-300 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Regresar
                </Link>
                </button>
            </form>
        </div>
    );
}

export default ProductsSectionPage;
