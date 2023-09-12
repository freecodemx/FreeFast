import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
//import { Message } from "../components/ui/Message.jsx";


function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    console.log(registerErrors)
    useEffect(() => {

        if (isAuthenticated) navigate('/products')
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        if (values.password !== values.passwordConfirmation) {
            alert("Las contraseñas no coinciden. Por favor, asegúrate de que las contraseñas sean iguales.");
            return;
        }
        await signup(values);
    });

    return (
        <div className="bg-zinc-900 text-white mx-auto max-w-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-6 md:p-10 rounded-md shadow-md">
            <h1 className="text-center text-blue-100 text-3xl md:text-4xl font-bold mb-4">Regístrate</h1>
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))
            }

            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    {...register("username", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md placeholder-gray-300 focus:outline-none"
                    placeholder="Nombre de usuario"
                />
                {errors.username && (
                    <p className="text-red-500">El nombre de usuario es requerido</p>
                )}
                <select {...register("tipo", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                    <option value="">¿Tipo de Usuario?</option>
                    <option value="Comprador">Comprador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Ambos">Ambos</option>
                </select>
                {
                    errors.tipo && (
                        <p className="text-red-500">¡EL tipo del producto es requerido!</p>
                    )
                }
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md placeholder-gray-300 focus:outline-none"
                    placeholder="Correo electrónico"
                />
                {errors.email && (
                    <p className="text-red-500">El correo electrónico es requerido</p>
                )}

                <input
                    type="phone"
                    {...register("phone", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md placeholder-gray-300 focus:outline-none"
                    placeholder="Teléfono"
                />
                {errors.phone && (
                    <p className="text-red-500">El teléfono es requerido</p>
                )}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md placeholder-gray-300 focus:outline-none"
                    placeholder="Contraseña"
                />
                {errors.password && (
                    <p className="text-red-500">La Contraseña es requerida</p>
                )}

                <input
                    type="password"
                    {...register("passwordConfirmation", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md placeholder-gray-300 focus:outline-none"
                    placeholder="Confirmar Contraseña"
                />
                {errors.passwordConfirmation && (
                    <p className="text-red-500">La confirmación de contraseña es requerida</p>
                )}

                <button
                    type="submit"
                    className="w-full py-2 bg-red-900 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Registrar
                </button>
            </form>

            <p className="flex justify-center mt-4">
                ¿Ya tienes una cuenta?<br />
            </p>
            <div className="text-center">
                <Link
                    to="/login"
                    className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Inicia sesión aquí
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;
