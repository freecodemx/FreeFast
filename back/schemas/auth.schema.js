import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: "El nombre de usuario es requerido",
    }),
email:  z.string({
    required_error: "El correo es requerido",
})
.email({
    message: "Correo inválido"
}),

tipo:  z.string({
    required_error: "El Tipo de Usuario es Requerido",
}),
password: z.string
({
    required_error: "La contraseña es requerida"
}).min(6,{
    message: "La contraseña debe de contener mínimo 6 carácteres"
}),
}); 

export const loginSchema = z.object({
    email: z.string({
        required_error: "El correo es requerido",
    }).email({
        message: "Correo Inválido"
    }),
    password: z.string({
        required_error: "Contraseña requerida",
    }).min(6, {
        message: "La contraseña debe de contener almenos 6 carácteres",
    }),
});