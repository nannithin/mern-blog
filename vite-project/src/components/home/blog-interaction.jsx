import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BlogContext } from "../blog";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";


const BlogInteraction = () => {
    let { blog: { blog_id,activity, author: { personal_info: { username : author_name, name, profile_img } }, activity: { total_likes } }, blog , setBlog ,islikebyuser , setIsLikeByUser } = useContext(BlogContext)

    let { userAuth: { username } } = useContext(UserContext);

    const likehandler = () => {
        setIsLikeByUser(preVal => !preVal)
        !islikebyuser ? total_likes++ : total_likes--;
        setBlog({...blog , activity : {...activity , total_likes}})
        
    }
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button onClick={likehandler} className={`w-10 h-10 flex justify-center items-center bg-grey/80 rounded-full ${islikebyuser ? "bg-pink-300" : ""}`}>
                    {islikebyuser ? <FaHeart className="text-red-500"/> : <FaRegHeart />}
                </button>
                <p className="text-textColor">{total_likes}</p>
            </div>
            {
                username == author_name && 
                <div>
                    <Link to={`/create-blog/${blog_id}`} className="underline text-[15px] md:text-[19px] mr-5">Edit</Link>
                </div>
            }
        </div>
    )
}

export default BlogInteraction;