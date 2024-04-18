import { Link } from 'react-router-dom';
import notfoundimg from '../assets/404-error-with-landscape-concept-illustration_114360-7898.avif'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center gap-20 md:mt-10 mt-6 text-center'>
            <img className='max-h-[300px] select-none max-w-[300px] object-cover' src={notfoundimg} alt="" />
            <div>
                <h1 className='md:text-2xl text-[17px] font-semibold'>Whoops! page not found</h1>
                <p className='text-[15px] text-textColor my-3 text-center'><Link to='/' className='text-blue-500 cursor-pointer'>click here</Link> to navigate home page</p>
            </div>
            <div>
                <h1 className='text-[17px] font-semibold'>BlogsApp</h1>
                <p className='text-textColor text-[14px] my-3'>Designed and Developed by <a className='text-blue-500' href="">Nithin!</a></p>
            </div>
        </div>
    )
}

export default NotFound;