import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogInteraction from "./home/blog-interaction";
import LatestBlogCard from "./home/latest-blog-card";
import BlogContent from "./blog-content";

export const BlogContext = createContext({})
const BlogStr = {
    author: { personal_info: {} },
    title: "",
    banner: "",
    content: [],
    des: "",
    publishedAt: "",

}

const Blog = () => {
    let { id } = useParams()

    const [blog, setBlog] = useState(BlogStr)
    const [similarblogs,setSimilarBlogs] = useState(null)
    const [loading, setLoading] = useState(true)
    const [islikebyuser,setIsLikeByUser] = useState(false);
    let { author: { personal_info: { name, username, profile_img } }, title, banner, content, des, publishedAt } = blog
    const fetchBlog = () => {
        axios.post("http://localhost:5000/api/blog/getblog", { blog_id: id }, { withCredentials: true })
            .then(({ data: { blog } }) => {
                
                setBlog(blog);
                axios.post("http://localhost:5000/api/blog/searchblog",{tag : blog.tags[0],limit : 6, elimate_blog : id })
                .then(({data})=>{
                    setSimilarBlogs(data.blogs)
                })
                setLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
    }

    const resetBlog = () =>{
        setBlog(BlogStr)
        setSimilarBlogs(null)
        setLoading(true)
    }

    useEffect(() => {
        resetBlog()
        fetchBlog()
    }, [id])


    return (
        <div>
            {
                loading ? <p className="text-center">Loading...</p> :
                    <BlogContext.Provider value={{blog , setBlog , islikebyuser , setIsLikeByUser}}>
                        <div className="max-w-[900px] py-10 max-lg:px-[5vw] mx-auto flex flex-col gap-5 md:gap-7">

                            <img className="aspect-video" src={banner} alt="" />

                            <h1 className="font-semibold text-[19px] md:text-2xl">{title}</h1>

                            <p className="text-textColor text-[15px] md:text-[17px]">{des}</p>

                            <BlogInteraction />
                            <div className="">
                                {
                                    content[0].blocks.map((item,i)=>{
                                        return <div key={i}>
                                            <BlogContent content={item}/>
                                        </div>
                                    })
                                }
                            </div>

                            {
                                similarblogs != null && similarblogs.length ? 
                                <>
                                <h1 className="text-[17px] md:text-2xl font-semibold">
                                    Similar blogs
                                </h1>
                                {
                                    similarblogs.map((blog,i)=>{
                                        let {author} = blog;
                                        return <LatestBlogCard key={i} content={blog} author={author}/>
                                    })
                                }
                                </>
                                : " "
                            }


                        </div>
                    </BlogContext.Provider>
            }
        </div>
    )
}

export default Blog;