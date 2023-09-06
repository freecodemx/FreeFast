import axios from "./axios";

// Obtener todas las secciones
export const getSectionsRequest = async () => axios.get("/sections");

export const getAllSectionsRequest = async () => axios.get("/all/sections");
// Crear una nueva sección
export const createSectionRequest = async (section) => axios.post("/sections", section);

// Actualizar una sección existente por ID
export const updateSectionRequest = async (id, section) => axios.put(`/sections/${id}`, section);

// Eliminar una sección por ID
export const deleteSectionRequest = async (id) => axios.delete(`/sections/${id}`);

// Obtener una sección por ID
export const getSectionRequest = async (id) => axios.get(`/sections/${id}`);
