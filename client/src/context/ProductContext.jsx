import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import {
    createProductRequest,
    getProductsRequest,
    deleteProductRequest,
    getProductRequest,
    updateProductRequest,
    getAllProductsRequest,
} from "../api/products.js";

const ProductContext = createContext();


export const useProduct = () => {
    const context = useContext(ProductContext);
    console.log(context);
    if (!context) {
        throw new Error("useProduct debe ser usado dentro de un ProductProvider");
    }
    return context;
};


export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

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

    const updateProduct = async (id, product) => {
        try {
            await updateProductRequest(id, product);
        } catch (error) {
            console.error(error);
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
                getProductsBySectionId
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
