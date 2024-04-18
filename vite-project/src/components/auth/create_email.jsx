
import { useContext, useEffect, useState } from 'react';
import './file.css'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {Toaster,toast} from "react-hot-toast";
import { storeInSession } from '../utils/session';
import { UserContext } from '../../App';



const CreateWithEmail = () => {

    const [data,setData] = useState(false)
    const [name,setName] = useState("") //data
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setCpassword] = useState("")
    let {setUserAuth} = useContext(UserContext)
    const navigate = useNavigate();              //navigate

    const Back = () =>{                          // navigate handler
        navigate("/");
    }

    const h = () => {
        if(name && email && password && cpassword){
            setData(true)
        }else{
            setData(false);
        }
    }
    const final = {
        name : name,
        email : email,
        password : password
    }
    useEffect(()=>{
        h();
    },[final])

    const Submit = async(e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:5000/api/auth/register",final,{withCredentials : true}).then(({data})=>{
            if(data.access){
                toast.success("Registered sucessfully");
                storeInSession("user",JSON.stringify(data.user.personal_info))
                setUserAuth(data.user.personal_info)
                navigate('/');
                
                }
                else{
                    
                    toast.error(data.message)
                    // console.log(resp.data)
                }
        }).catch(()=>{
            toast.error("Something went wrong")
        })
       
        
    }

    
    return (
        <div className="pt-8 px-5 md:pt-10 md:px-8 w-full min-h-screen">
        <Toaster/>
            <div className="flex justify-between">
                <button onClick={Back}>BACK</button>
                <button>LOG IN</button>
            </div>
            <div className="min-w-[250px] max-w-[350px] flex flex-col mx-auto gap-[20px] mt-[4rem] ">
                <h1 className="text-2xl text-center font-bold mb-[20px]">Create Your Account</h1>
                <div className="flex flex-col gap-[10px] ">
                    <label htmlFor="">
                        USER NAME
                    </label>
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="User name" name="name" className="outline-none border-b-[1px] pb-[7px] text-[14px] focus:bg-transparent " />
                </div>
                <div className="flex flex-col gap-[10px] ">
                    <label htmlFor="">
                        EMAIL
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" name="email" className="outline-none border-b-[1px] pb-[7px] text-[14px] focus:bg-transparent " />
                </div>
                <div className="flex flex-col gap-[10px] ">
                    <label htmlFor="">
                        PASSWORD
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="password" name="password" className="outline-none border-b-[1px] pb-[7px] text-[14px] focus:bg-transparent " />
                </div>
                <div className="flex flex-col gap-[10px] ">
                    <label htmlFor="">
                        CONFIRM PASSWORD
                    </label>
                    <input onChange={(e) => setCpassword(e.target.value)} type="text" placeholder="confirm password" name="cpassword" className="outline-none border-b-[1px] pb-[7px] text-[14px] focus:bg-transparent " />
                </div>
                <p className='text-center text-[11px] text-textColor px-2'>By creating an account, you agree to our Terms of Service and have read and understood the Privacy Policy</p>
                <button onClick={Submit} className={`${data ? "bg-black text-white" : "bg-gray-200 text-textColor"} w-full py-3 text-[14px] font-semibold`}>CREATE</button>
            </div>
        </div>
    )
}

export default CreateWithEmail;