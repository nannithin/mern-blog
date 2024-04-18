import { useContext, useState } from 'react';
import { UserContext } from '../App';
import CheckAuth from './auth/useauth';
import { IoSearch } from "react-icons/io5";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import NavOpen from './navopen';

const Header = ({searchBoxVis , setSearchBoxVis }) => {
    let {  userAuth } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    
    const { auth } = CheckAuth();
    console.log(searchBoxVis)
    const navigate = useNavigate()

    

    const handleSearch = (e) => {
        let query = e.target.value;
        if (e.keyCode == 13 && query.length) {
            setSearchBoxVis(!searchBoxVis)
            navigate(`/search/${query}`)
        }
    }
    return (
        <>
            <nav className='navbar'>
                <Link to='/'>
                    <h1 className='text-2xl font-bold'>Blog</h1>
                </Link>
                <div className={`absolute w-full left-0 top-full py-4 px-[5vw] md:block md:relative md:inset-0 md:p-0 md:w-auto md:opacity-100 md:pointer-events-auto ${searchBoxVis ? "opacity-100 pointer-events-auto" : "opacity-0 duration-100 pointer-events-none"}`}>
                    <input className='outline-none w-full md:w-auto bg-grey pl-6 p-3 pr-[12%] md:pr-6 placeholder:text-textColor rounded-full md:pl-12 ' type="text" placeholder='search' name="" id="" onKeyDown={handleSearch} />
                    <IoSearch className='absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-2xl text-textColor'/>
                </div>
                <div className=' flex items-center gap-3 md:gap-6 ml-auto '>
                    <button className='md:hidden w-11 h-11 bg-grey rounded-full flex items-center justify-center text-[20px]'
                    onClick={()=>setSearchBoxVis(currentVal => !currentVal)}
                    ><IoSearch/></button>
                    {
                        !auth ?
                        <Link to='/auth/signin'><button className='bg-black py-2 px-4 rounded-full text-white'>SIGN IN</button></Link>
                        :
                        <img onClick={()=>setOpen(!open)} className='w-10 h-10 rounded-full object-cover cursor-pointer' src={userAuth && userAuth.profile_img} alt="" />
                    }
                </div>
            </nav>
            {open && <NavOpen setOpen={setOpen} userAuth={userAuth}/>}
            <Outlet />
        </>
    )
}

export default Header;