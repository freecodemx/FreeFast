import { Store } from '../models/store.model.js';
import { validationResult } from 'express-validator';

export const getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        console.error("Error al obtener tiendas:", error);
        res.status(500).json({ message: "Algo ha salido mal!" });
    }
};

export const createStore = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, direccion, telefono } = req.body;
        const newStore = new Store({
            nombre,
            direccion,
            telefono
        });

        const savedStore = await newStore.save();
        res.status(201).json(savedStore); // 201 significa "Created"
    } catch (error) {
       // console.error("Error al crear la tienda:", error);
        res.status(500).json({ message: "No se pudo crear la tienda, cambia el nombre" });
    }
};

export const getStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: "Tienda no encontrada" });
        }
        res.json(store);
    } catch (error) {
        console.error("Error al obtener la tienda:", error);
        res.status(500).json({ message: "Algo ha salido mal!" });
    }
};

export const deleteStore = async (req, res) => {
    try {
        const store = await Store.findByIdAndDelete(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json({ message: "Tienda eliminada con éxito" });
    } catch (error) {
        console.error("Error al eliminar la tienda:", error);
        res.status(500).json({ message: "Algo ha salido mal!" });
    }
};

export const updateStore = async (req, res) => {
    try {
        const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!store) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.json(store);
    } catch (error) {
        console.error("Error al actualizar la tienda:", error);
        res.status(500).json({ message: "Algo ha salido mal!" });
    }
};
