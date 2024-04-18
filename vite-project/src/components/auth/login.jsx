import { useContext, useEffect, useState } from "react";
import img from "../../assets/icons8-google.svg";
import img1 from "../../assets/icons8-discord-48.png"
import img2 from "../../assets/icons8-facebook-48.png";
import { MdOutlineMailOutline } from "react-icons/md";
import {Link , useNavigate} from 'react-router-dom';
import { authWithGoogle } from "../utils/firebase";
import axios from "axios";
import { storeInSession } from "../utils/session";
import CheckAuth from "./useauth";
import { UserContext } from "../../App";


const Login = () => {
    const [open, setOpen] = useState(false);
    let {setUserAuth} = useContext(UserContext)
    const {auth} = CheckAuth();
    
    const navigate = useNavigate();
    const Back = () =>{
        navigate("/");
    }

    useEffect(()=>{
        if(auth){
            navigate('/')
        }
    },[auth])
    


    const handleGoogleAuth  = (e) =>{
        e.preventDefault();
        authWithGoogle().then(async(user)=>{
            let formData = {
                access_token : user.accessToken
            }
            const resp = await axios.post("http://localhost:5000/api/auth/google_auth",formData,{withCredentials : true});
            
            storeInSession("user",JSON.stringify(resp.data.personal_info));
            console.log(resp.data)
            setUserAuth(resp.data.personal_info)
            navigate('/')
            
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    return (
        <div className="pt-8 px-5 md:pt-10 md:px-8 w-full min-h-screen">
            <div className="flex justify-between">
                <button onClick={Back}>BACK</button>
                <button>LOG IN</button>
            </div>
            <div className={`min-w-[250px] max-w-[400px] mx-auto md:px-5 md:py-5 ${!open ? 'mt-[9rem]' : 'mt-[5rem]'} flex flex-col text-center`}>
                <div>
                    <h1 className="font-bold my-3 text-2xl">Create Your Account</h1>
                    <p className="text-textColor md:text-[13px] text-[11px] my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia consequuntur modi nemo eos .</p>
                    <div className="my-5  flex flex-col gap-[10px] text-[14px]">
                        <div className="flex border-[1px] border-black py-3 pl-5 cursor-pointer">
                            <img className="w-[30px] h-[30px]" src={img} alt="" />
                            <button onClick={handleGoogleAuth} className="w-auto mx-auto font-bold">Continue with Google</button>
                        </div>
                        {
                            open && <>
                                <div className="flex border-[1px] border-black py-3 pl-5 cursor-pointer">
                                    <img className="w-[30px] h-[30px]" src={img2} alt="" />
                                    <button className="w-auto mx-auto font-bold">Continue with Facebook</button>
                                </div>
                                <div className="flex border-[1px] border-black py-3 pl-5 cursor-pointer">
                                    <img className="w-[30px] h-[30px]" src={img1} alt="" />
                                    <button className="w-auto mx-auto font-bold">Continue with Discord</button>
                                </div>
                                </>
                            
                        }
                        <Link to="/auth/createwithemail">
                        <div className="flex border-[1px] border-black py-3 pl-5 cursor-pointer">
                            <MdOutlineMailOutline className="w-[30px] h-[30px]" />
                            <button className="w-auto mx-auto font-bold">Continue with Email</button>
                        </div>
                        </Link>
                    </div>
                    {!open && <h1 onClick={()=>setOpen(true)} className="text-[14px] font-semibold mt-[30px] cursor-pointer">MORE OPTIONS</h1>}
                </div>
            </div>
        </div>
    )
}

export default Login;