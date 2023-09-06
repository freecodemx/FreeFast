import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
 

function LoginPage() {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const {signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated)
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });


  //SI está autenticado cambia de página
useEffect(() => {
  if(isAuthenticated) navigate("/sections");
}, [isAuthenticated]);

  return (
    <div className="">
      <div className="bg-zinc-800 text-white mx-auto max-w-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-6 md:p-10 rounded-md shadow-md">
      <h2 className="text-2xl md:text-2xl font-bold text-center">📤 Iniciar Sesión 📤</h2><br/>

        {
                signinErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
        <form
          onSubmit={onSubmit}
        >
          <input type="email" {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {
            errors.email && (
              <p className="text-red-500"> El correo electrónico es requerido</p>
            )
          }
          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {
            errors.password && (
              <p className="text-red-500 my-2"> La Contraseña es requerida</p>
            )
          }<br/>
<div className="mx-auto max-w-sm">
  <button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300" type="submit">
    Iniciar
  </button>
</div>
<p className="flex flex-col items-center justify-center mt-4 text-white-600">
  ¿No tienes una cuenta? 
  <Link to="/register" className="px-3 py-1 mt-2 text-sky-500 hover:text-sky-600 transition duration-300"><br/>
    <button   className="text-white text-center bg-orange-600 hover:bg-orange-800 px-6 py-1 rounded-lg block md:inline-block">
      Regístrate
    </button>
  </Link>
</p>

</form>
      </div>

    </div>



  )
}
export default LoginPage