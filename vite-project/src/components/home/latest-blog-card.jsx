import img from '../../assets/photo-1523240795612-9a054b0db644.jpeg.jpg'
import { TiHeartOutline } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LatestBlogCard = ({ content, author }) => {
    let { banner, title, tags, des, blog_id: id } = content;
    let { personal_info: { username }, personal_info: { profile_img } } = author
    return (
        <Link to={`/blog/${id}`} className='w-full flex gap-8 md:gap-12 items-center pb-6 border-b-2 mb-[24px] '>
            <div className='h-20 md:h-28 aspect-square'>
                <img className='w-full h-full aspect-square object-cover' src={banner} alt="" />
            </div>
            <div className=''>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-black text-[15px] md:text-[21px] font-bold'>{title}</h1>
                    <p className='text-textColor text-[14px] md:text-[16px] line-clamp-2 md:line-clamp-3'>{des}</p>

                    <div className='w-full'>
                        <div className='flex flex-col gap-3 md:gap-5'>
                            <div className='flex md:justify-start justify-between md:gap-7 gap-0 items-center'>
                                <p className='bg-slate-300 text-textColor  md:px-[15px] md:py-[6px] py-[5px] px-[13px] text-[14px] md:text-[16px] rounded-full'>{tags[0]}</p>
                                <Link to={`/user/${username}`} className='flex gap-3 items-center'>
                                    <img className='h-[20px] w-[20px] md:h-[30px] md:w-[30px] rounded-full object-cover' src={profile_img} alt="" />
                                    <span className='text-textColor text-[14px] md:text-[16px]'>@{username}</span>
                                </Link>
                            </div>
                            <div className='flex  justify-between gap-5 ml-2 text-[18px] md:text-[21px]'>
                                <div className='flex gap-2 text-textColor  md:gap-4 items-center'>
                                    <span className=''><TiHeartOutline /></span>
                                    <span className=' text-[13px] md:text-[15px]'>3mins ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Link>
    )
}

export default LatestBlogCard;