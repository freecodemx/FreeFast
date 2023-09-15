import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getSection,
    getSections,
    createSection,
    updateSection,
    deleteSection
} from "../controllers/sections.controller.js"; // Asegúrate de importar los controladores adecuados

const router = Router();

// Obtener todas las secciones
router.get("/sections", authRequired, getSections);

// Obtener una sección por ID
router.get("/sections/:id", authRequired, getSection);

// Crear una nueva sección
router.post("/sections", authRequired, createSection);

// Actualizar una sección por ID
router.put("/sections/:id", authRequired, updateSection);

// Eliminar una sección por ID
router.delete("/sections/:id", authRequired, deleteSection);

export default router;
