import { useParams } from "react-router-dom";
import InPageNavigation from "./utils/inpagenavigation";
import LatestBlogCard from "./home/latest-blog-card";
import NoData from "./home/no-data-msg";
import LoadMoreBtn from "./utils/load-more-btn";
import { useEffect, useState } from "react";
import axios from "axios";
import { FilterPagination } from "./home/filter-pagination";
import UserCard from "./home/user-card";

const SearchPage = () => {
    let {query} = useParams();

    const [latestBlogs,setLatestBlogs] = useState(null);
    const [users,setUsers] = useState(null)

    const SearchBlogs = ({ page= 1 ,create_arr = false }) => {
        axios.post("http://localhost:5000/api/blog/searchblog",{query,page})
        .then(async({ data }) => {
            console.log(data)
            let formatedData = await FilterPagination({
                state: latestBlogs,
                data: data.blogs,
                page,
                count_route: "search-blogs-count",
                data_to_send : {query},
                create_arr,


            })
            console.log(formatedData)
            setLatestBlogs(formatedData)
            
        })
        .catch(err => console.log(err))
    }

    const FetchUsers = () => {
        axios.post("http://localhost:5000/api/blog/search-users", {query})
        .then(({data :{users}}) => {
            console.log(users)
            setUsers(users)
        })
    }

    const resetFun = () => {
        setUsers(null)
        setLatestBlogs(null);
    }

    useEffect(()=>{
        resetFun()
        FetchUsers();
        SearchBlogs({page : 1 , create_arr : true})
    },[query])

   const UserWrapper = () => {
    
    return(
        
        <>
        {
            users == null ? <p>Loading...</p> : (
                users.length ?
                users.map((user, i) => {
                    return <UserCard user={user} key={i} />
                }) : <NoData message='users not found'/>
            )
        } 
        </>
    )
   }

    return(

        <div className={"h-cover flex justify-center gap-10 px-3"}>
            <div className="w-full px-5 md:px-8">
                <InPageNavigation routes={[`Results for ${query}` , "users matched"]  } defaultHidden={["users matched"]}>
                    <>
                    {
                                latestBlogs == null ? <p className="text-center">Loading...</p> : (
                                    latestBlogs.results.length ? 
                                    latestBlogs.results.map((blog, i) => {
                                        return <LatestBlogCard content={blog} author={blog.author} key={i} />
                                    }) : <NoData message="No blogs found"/>
                                )

                                
                            }
                            <LoadMoreBtn state={latestBlogs} fetchFun={SearchBlogs}/>
                    </>
                    <UserWrapper/>
                </InPageNavigation>
            </div>
            <div className="min-w-[40%] lg:min-w-[400px] pt-8 pl-4 max-w-min border-l-2 max-md:hidden">
                <h1 className="text-textColor mb-8">Users releated to <span className="text-black">{query}</span></h1>
                <UserWrapper/>
            </div>
        </div>
    )
}

export default SearchPage;