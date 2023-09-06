import {z} from "zod";

export const createProductSchema = z.object({
    nombre: z.string({
        required_error: "El nombre del producto es requerido"
    }),
    precio: z.string({
        required_error: "El precio es requerido"
    }),
    categoria: z.string({
        required_error: "El nombre de la categoría es requerida"
    }),
    fabricante: z.string({
        required_error: "El nombre del fabricante es requerido"
    }),

    numero_existencias: z.string({
        required_error: "El Número de existencias es requerido"
    }),
    section: z.string({
        required_error: "El Sección del Producto es requerida"
    }),
})