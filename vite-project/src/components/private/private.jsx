import { Navigate, Outlet } from "react-router-dom";
import CheckAuth from "../auth/useauth";


const Private = () => {
    const {auth} = CheckAuth();
    
      

    if(auth===undefined){
        return <div>Loading...</div>
    }

    return auth ? <Outlet/> : <Navigate to= "/auth/Signin"/>
}

export default Private;