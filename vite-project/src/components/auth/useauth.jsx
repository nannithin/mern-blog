import axios from "axios";
import { useEffect, useState } from "react";

const CheckAuth = () => {
    const [auth,setAuth] = useState();

    const islogin = async()=> {
        try {
            const resp = await axios.get("http://localhost:5000/api/auth/islogin",{
                withCredentials : true
            });
            return resp.data;
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        (
            async () =>{
                const data = await islogin();
                setAuth(data)
            }
        )()
    })
    return {auth}
}

export default CheckAuth;