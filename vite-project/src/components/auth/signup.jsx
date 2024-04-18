import { MdArrowBackIos } from "react-icons/md";
import img from "../../assets/icons8-google.svg"
import img1 from "../../assets/icons8-discord-48.png"
import img2 from "../../assets/icons8-facebook-48.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storeInSession } from "../utils/session";
import { useContext, useEffect, useState } from "react";
import CheckAuth from "./useauth";
import { UserContext } from "../../App";

const Signup = () => {
    const navigate = useNavigate();
    const [data,setData] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const {auth} = CheckAuth();

    let {setUserAuth} = useContext(UserContext)

    useEffect(()=>{
        if(auth){
            navigate('/')
        }
    },[auth])
    const h = () => {
        if(email && password){
            setData(true)
        }else{
            setData(false);
        }
    }
   
    const final = {
        email : email,
        password : password
    }
    useEffect(()=>{
        h();
    },[final])

    const Submit = async(e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:5000/api/auth/login",final,{withCredentials : true})
        .then(({data})=>{
            
                if(data.access){
                    storeInSession("user",JSON.stringify(data.user.personal_info))
                    setUserAuth(data.user.personal_info)
                    navigate('/');
                } 
                else{
                    alert(data.message)
                }
            
        }).catch(({response})=>{
            console.log(response.data)
        })
        
        
    }



    return (
        <div className="pt-8 px-5 md:pt-10 md:px-8 w-full min-h-screen">
            <div className="flex justify-between">
                <p className="flex items-center cursor-pointer"><MdArrowBackIos/>BACK</p>
                <p onClick={()=>navigate("/auth/signup")}  className="cursor-pointer">CREATE ACCOUNT</p>
            </div>
            <div className=" mx-auto text-center my-[4rem] flex flex-col gap-[2rem] min-w-[200px] max-w-[900px]">
                <div>
                    <h1 className="font-[600] md:text-[22px] text-[20px]">Log into College Series</h1>
                </div>
                <div className="flex md:flex-row flex-col my-5 justify-center md:gap-[3rem] gap-0 md:py-[2rem]">
                    <form autoComplete="off" className="mx-auto w-full md:w-[40%] md:mx-0 gap-8 flex flex-col">
                        <div className="">
                            <p className="text-[12px] md:text-[15px] text-textColor text-left">EMAIL ADDRESS</p>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)}  autoComplete="false" className="border-0 outline-none py-3 border-b-[1px] w-full" type="email" name="hidden" id="" placeholder="name@example.com" />
                        </div>
                        <div>
                            <p className="text-[12px] text-left md:text-[15px] text-textColor">PASSWORD</p>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border-0 w-full outline-none py-3 border-b-[1px] text-textColor" type="password" placeholder="Password" />
                        </div>
                        <div>
                            <button onClick={Submit} className={`${data ? "bg-black text-white" : "bg-gray-200 text-textColor"} w-full py-3 text-[14px] font-semibold`}>LOG IN</button>
                        </div>
                    </form>
                    <div className="flex md:flex-col  items-center gap-2 mt-[35px] md:mt-0">
                    <div className="w-[45%] md:w-[2px] md:h-[45%] h-[2px] bg-gray-300"></div>
                        <p className="text-[14px] text-gray-300 font-medium">OR</p>
                        <div className="w-[45%] md:w-[2px] md:h-[45%] h-[2px] bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-[40%] mt-[3rem] md:my-0 ">
                        <div className="flex border-[1px] border-black py-3 justify-start gap-6 pl-5 cursor-pointer">
                            <img className="w-[35px] h-[35px]" src={img} alt="" />
                            <button className="mx-4">Continue with Google</button>
                        </div>
                        <div className="flex border-[1px] border-black py-3 justify-start gap-6 pl-5 cursor-pointer">
                            <img className="w-[35px] h-[35px]" src={img2} alt="" />
                            <button className="mx-4">Continue with Facebook</button>
                        </div>
                        <div className="flex border-[1px] border-black py-3 justify-start gap-6 pl-5 cursor-pointer">
                            <img className="w-[35px] h-[35px]" src={img1} alt="" />
                            <button className="mx-4">Continue with Discord</button>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-[15px] text-textColor">Facing problem while login? contact nithinyalakala@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Signup;