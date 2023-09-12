import PropTypes from "prop-types";
//import { useEffect } from "react";
import moment from "moment";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const { deleteProduct } = useProduct();
    

    return (
        <div className=" hover:bg-blue-900 border border-gray-300 p-4 rounded-lg shadow-md text-white">
            <p className="text-white mb-2">
                <span className="font-bold">Nombre:</span> {product.nombre}
            </p>
            <p className="text-white mb-2">
                <span className="font-bold">Existencias:</span>{" "}
                {product.numero_existencias}
            </p>
            <p className="text-white mb-2">
                <span className="font-bold">Precio:</span>{" "}
                {product.precio}
            </p>
            {product.createdAt && (
                <p className="text-white mb-4">
                    <span className="font-bold">Fecha de Creación:</span>{" "}
                    {moment(product.createdAt).format("L")}
                </p>
            )}
            <div className="flex flex-wrap gap-2 sm:gap-4">
                <Link
                    onClick={() => {
                        deleteProduct(product._id);
                    }}
                    className="bg-red-600 hover:bg-red-600 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Borrar
                </Link>
                <Link
                    to={`/products/${product._id}`}
                    className="bg-blue-300 hover:bg-blue-300 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Editar
                </Link>
                <Link
                    to={`/product/detail/${product._id}`}
                    className="bg-orange-600 hover:bg-orange-600 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Detalles
                </Link>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        numero_existencias: PropTypes.string.isRequired,
        precio: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        imagen: PropTypes.string,
        // Agrega más validaciones de propiedades si es necesario
    }).isRequired,
};

export default ProductCard;
