import { z } from "zod";

export const createSectionSchema = z.object({
    nombre: z.string({
        required_error: "El nombre de la seccion es requerido"
    }),
    descripcion: z.string({
        required_error: "La descripcion de la seccion es requerida"
    }) // Opcional, no tiene mensaje de error personalizado
});
