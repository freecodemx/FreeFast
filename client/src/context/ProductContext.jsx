import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import {
    createProductRequest,
    getProductsRequest,
    deleteProductRequest,
    getProductRequest,
    updateProductRequest,
    getAllProductsRequest,
    sendProductRequest,
    acceptProductRequest
} from "../api/products.js";

const ProductContext = createContext();


export const useProduct = () => {
    const context = useContext(ProductContext);
    //console.log(context);
    if (!context) {
        throw new Error("useProduct debe ser usado dentro de un ProductProvider");
    }
    return context;
};


export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Define la función sendProduct para enviar solicitudes de producto
    const sendProduct = async (data) => {
        try {
            const res = await sendProductRequest(data);

            // Después de enviar la solicitud, actualiza el estado del producto a "Solicitado"
            if (res.data) {
                const updatedProducts = products.map((product) => {
                    if (product._id === data.productId) {
                        product.estatus = 'Solicitado';
                    }
                    return product;
                });
                setProducts(updatedProducts);
            }

            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Define la función acceptProduct para aceptar un producto
    const acceptProduct = async (data) => {
        try {
            const res = await acceptProductRequest(data);

            // Después de aceptar la solicitud, actualiza el estado del producto a "Entregado"
            if (res.data) {
                const updatedProducts = products.map((product) => {
                    if (product._id === data.productId) {
                        product.estatus = 'Entregado';
                    }
                    return product;
                });
                setProducts(updatedProducts);
            }

            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllProducts = async () => {
        try {
            const res = await getAllProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

/*     useEffect(() => {
        getAllProducts()
    }, []);
 */
    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if (res.status === 204) setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.log(error);
        }
    };


    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    // Define la función para actualizar un producto
    const updateProduct = async (id, updatedProductData) => {
        try {
            const res = await updateProductRequest(id, updatedProductData);

            // Después de actualizar el producto con éxito, puedes realizar lógica adicional si es necesario
            // Por ejemplo, si se cambió el campo "estatus", puedes actualizarlo en el estado local
            if (res.data) {
                const updatedProducts = products.map((product) => {
                    if (product._id === id) {
                        // Asumiendo que "estatus" es un campo en updatedProductData
                        product.estatus = updatedProductData.estatus;
                    }
                    return product;
                });
                setProducts(updatedProducts);
            }

            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getProductById = (id) => {
        return products.find((product) => product._id === id);
    };
//Obtener productos por ID de Section
const getProductsBySectionId = (sectionId) => {
    // Filtra los productos que pertenecen a la sección con el ID proporcionado
    return products.filter((product) => product.section === sectionId);
};
//Envío de notificaciones
const sendNotification = (senderId, receiverId, message) => {
    const newNotification = {
        senderId,
        receiverId,
        message,
    };
    setNotifications([...notifications, newNotification]);
};
    return (
        <ProductContext.Provider
            value={{
                products,
                getProducts,
                getAllProducts,
                createProduct,
                deleteProduct,
                getProduct,
                updateProduct,
                getProductById,
                getProductsBySectionId,
                sendNotification,
                sendProduct,
                acceptProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
