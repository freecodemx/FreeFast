import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapse = () => setCollapsed(!collapsed);
    const { isAuthenticated, user, logout } = useAuth();
    return (

        <nav className="bg-gray-900 my-3 py-3 px-4 lg:px-10 rounded-lg flex flex-col lg:flex-row-reverse items-start lg:items-center justify-between shadow-md">

            {collapsed ? '' : <Link to="/" className="text-2xl font-bold text-white lg:order-last">
                Free Fasta
            </Link>}


            <ul className={`lg:flex ${collapsed ? 'hidden' : 'flex'} flex-col lg:flex-row-reverse mt-4 lg:mt-0 lg:space-x-4 lg:items-center`}>
                {isAuthenticated ? (
                    <>
                        {user.tipo === "Ambos" || user.tipo === "Vendedor" && (
                            <>
                        <li   className="text-white bg-red-900 hover:bg-red-800 px-3 ml-6 py-1 rounded-lg block md:inline-block">
                            <Link to="/"
                            onClick={() => {
                                logout();
                            }}>Salir</Link>
                        </li>
                        <li>
                                    <Link
                                        to="/sections"
                                        className="text-white bg-red-900 hover:bg-red-900 px-4 py-1 rounded-lg block md:inline-block"
                                    >
                                        Secciones
                                    </Link>
                                </li>
                                <li >
                                    <Link
                                        to="/store/new"
                                        className="text-white bg-orange-900 hover:bg-orange-800 px-2 py-1 rounded-lg block md:inline-block"
                                    >
                                        Nueva Tienda
                                    </Link>
                                </li>
                                <li >
                                    <Link
                                        to="/products"
                                        className="text-white bg-purple-900 hover:bg-orange-800 px-2 py-1 rounded-lg block md:inline-block"
                                    >
                                        Mis Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="all/products"
                                        className="text-white bg-gray-600 hover:bg-gray-300 px-2 py-1 rounded-lg block md:inline-block"
                                    >
                                        Ver Productos
                                    </Link>
                                </li>
                                <li >
                                
                                </li>
                                <li className='text-white'>
                                Bienvenido: {user.tipo} {user.username}  👤
                                </li>

                            </>
                        )}
                        {user.tipo === "Comprador" && (
                            // Si el usuario no es "Vendedor" y es "Comprador"
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className="text-white bg-red-900 hover:bg-red-800 ml-6 px-4 py-1 rounded-lg block md:inline-block"
                                        onClick={logout}
                                    >
                                        Salir
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/sections"
                                        className="text-white bg-red-900 hover:bg-red-900 px-4 py-1 rounded-lg block md:inline-block"
                                    >
                                        Secciones
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="all/products"
                                        className="text-white bg-blue-600 hover:bg-green-800 px-4 py-1 rounded-lg block md:inline-block"
                                    >
                                        Ver Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="stores"
                                        className="text-white bg-purple-600 hover:bg-green-800 px-4 py-1 rounded-lg block md:inline-block"
                                    >
                                        Tiendas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="foods/bank"
                                        className="text-white bg-yellow-600 hover:bg-green-800 px-4 py-1 rounded-lg block md:inline-block"
                                    >
                                        Banco de Alimentos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="products/bank"
                                        className="text-white bg-green-600 hover:bg-green-800 px-4 py-1 rounded-lg block md:inline-block"
                                    >
                                        Banco de Productos
                                    </Link>
                                </li>
                                <li className="text-white">
                                    Bienvenido: {user.tipo} {user.username} 👤
                                </li>
                            </>
                        )}

                    </>
                ) : (
                    <>
                        <li className="mb-2">
                            <Link
                                to="/register"
                                className="text-white bg-green-900 hover:bg-yellow-800 ml-3 px-4 py-1 rounded-lg block md:inline-block"
                            >
                                Registrarse
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                to="/login"
                                className="text-white bg-blue-900 hover:bg-blue-800 px-4 py-1 rounded-lg block md:inline-block"
                            >
                                Iniciar Sesión
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-white lg:order-last">
                    FREE FAST 🍫
                </Link>

                <button
                    onClick={toggleCollapse}
                    className="lg:hidden ml-4 text-white focus:outline-none"
                >
                    {collapsed ? '☰' : '✖'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
