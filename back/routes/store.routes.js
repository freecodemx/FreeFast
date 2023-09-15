import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getStore,
    getStores,
    createStore,
    updateStore,
    deleteStore
} from "../controllers/store.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createStoreSchema } from "../schemas/store.schema.js";

const router = Router();

// Rutas relacionadas con las tiendas (stores)
router.get("/stores", authRequired, getStores);
router.get("/stores/:id", authRequired, getStore);
router.post("/stores", authRequired, validateSchema(createStoreSchema), createStore);
router.put("/stores/:id", authRequired, updateStore);
router.delete("/stores/:id", authRequired, deleteStore);

export default router;
