import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-5xl w-full px-4 py-8">
      <h1 className="text-3xl md:text-9xl lg:text-9xl font-bold mb-4 text-center">
        ¡Bienvenido!
      </h1>
      <p className="text-center text-sm md:text-base text-white">
        <br />
        Este es un sitio web, donde encontrarás todo tipo de comida y productos de
        cualquier categoría, incluyendo una categoría: Gratis.
        <br />
        <br />
      </p>

      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
         ¿Qué es lo que deseas? 
        <br />
      </h2>

      <div className="flex flex-col md:flex-row gap-4 text-center">
        <Link
          to="/register"
          className="bg-orange-600 text-white text-center px-6 py-2 rounded-md text-sm md:text-base"
        >
          Comida
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 text-white text-center px-4 py-2 rounded-md text-sm md:text-base"
        >
          Productos
        </Link>
       
      </div>
      <div className='text-center'>
      <Avatar />
      </div>

      {/* Saludo de bienvenida */}
      <p className="mt-6 text-lg font-semibold text-center text-gray-600">
        ¡Esperamos que encuentres lo que estás buscando!
      </p>
    </div>
  );
}

export default HomePage;
