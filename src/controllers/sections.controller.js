// controllers/sections.controller.js
import { Section } from '../models/section.model.js';

// Obtener todas las secciones
export const getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las secciones." });
    }
}

// Obtener una sección por ID
export const getSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) {
            res.status(404).json({ message: "Sección no encontrada." });
            return;
        }
        res.json(section);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la sección." });
    }
}

// Crear una nueva sección
export const createSection = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const newSection = new Section({ nombre, descripcion });
        const savedSection = await newSection.save();
        res.json(savedSection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la sección." });
    }
}

// Actualizar una sección por ID
export const updateSection = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const updatedSection = await Section.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion },
            { new: true }
        );
        if (!updatedSection) {
            res.status(404).json({ message: "Sección no encontrada." });
            return;
        }
        res.json(updatedSection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la sección." });
    }
}

// Eliminar una sección por ID
export const deleteSection = async (req, res) => {
    try {
        const deletedSection = await Section.findByIdAndDelete(req.params.id);
        if (!deletedSection) {
            res.status(404).json({ message: "Sección no encontrada." });
            return;
        }
        res.json({ message: "Sección eliminada con éxito." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la sección." });
    }
}
