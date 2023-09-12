import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    sendProduct,
    acceptProduct
} from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema} from "../schemas/product.schema.js"

const router = Router();

router.get("/products", authRequired, getProducts);
router.get("/products/:id", authRequired, getProduct);
router.post("/products", authRequired, validateSchema(createProductSchema), createProduct);
router.put("/products/:id", authRequired, updateProduct);
router.delete("/products/:id", authRequired, deleteProduct);
//Obtiene todos los productos
router.get("/all/products", authRequired, getAllProducts);
//Solicitud de notificaciones
router.post("/solicitar", authRequired, sendProduct);
//Aceptar 
router.post("/aceptar", authRequired, sendProduct);
export default router;
