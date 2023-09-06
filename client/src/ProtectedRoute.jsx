import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
//import { useEffect } from 'react';

function ProtectedRoute(){
    const { loading, isAuthenticated} = useAuth();
  //  const navigate = useNavigate();
   
    //SI está autenticado cambia de página

/*   //Comprador
  useEffect(() => {
    if(isAuthenticated && user.tipo == "Comprador") navigate("/products");
  }, [isAuthenticated]);

  useEffect(() => {
    if(isAuthenticated && user.tipo == "Comprador") navigate("/sections");
  }, [isAuthenticated]);

  //Vendedor
  useEffect(() => {
    if(isAuthenticated && user.tipo == "Vendedor") navigate("/products");
  }, [isAuthenticated]);

  useEffect(() => {
    if(isAuthenticated && user.tipo == "Vendedor") navigate("/sections");
  }, [isAuthenticated]);
 */
    

    if(loading) return <h1>Loading ...</h1>;
    if(!loading && !isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />;

    



  }
  export default ProtectedRoute;