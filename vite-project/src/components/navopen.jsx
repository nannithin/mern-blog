/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { FaBell } from "react-icons/fa";

const NavOpen = ({ userAuth , setopen }) => {
    return(
        <div>
            <div className='w-[200px] z-[100] h-[200px] bg-[#F3F3F3] fixed right-[50px] top-[85px] rounded-md text-center flex flex-col px-5'>
                <Link onClick={()=>setopen(false)} className='flex items-center' to={`/user/${userAuth.username}`}><FaBell className='text-textColor'/><p className='w-auto mx-auto py-3 border-b-[1px] border-[#F3F3F3] text-textColor'>Profile</p></Link>
                <Link onClick={()=>setopen(false)} to='/create-blog' className='flex items-center' ><FaBell className='text-textColor'/><p className='w-auto mx-auto py-3 border-b-[1px] border-[#F3F3F3] text-textColor'>Create</p></Link>
                <Link onClick={()=>setopen(false)} className='flex items-center' to='/'><FaBell className='text-textColor'/><p className='w-auto mx-auto py-3 border-b-[1px] border-[#F3F3F3] text-textColor'>Logout</p></Link>
                <p className='mt-[10px] font-sans text-textColor'>@{userAuth && userAuth.username}</p>
            </div>
        </div>
    )
}

export default NavOpen;