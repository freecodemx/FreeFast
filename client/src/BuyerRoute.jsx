import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function BuyerRoute(){
    const { loading, isAuthenticated} = useAuth();
    const {user } = useAuth();
    console.log(user)
    

    if(loading ) return <h1>Loading ...</h1>;
    if(!loading && !isAuthenticated && user.tipo == "Comprador") return <Navigate to="/login" replace />;
    return <Outlet />;
  }
  export default BuyerRoute;