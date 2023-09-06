import { z } from "zod";

export const createStoreSchema = z.object({
    nombre: z.string({
        required_error: "El nombre de la tienda es requerido"
    }),
    direccion: z.string({
        required_error: "La dirección de la tienda es requerida"
    }),
    telefono: z.string({
        required_error: "El teléfono de la tienda es requerido"
    }), // Opcional, no tiene mensaje de error personalizado
});
