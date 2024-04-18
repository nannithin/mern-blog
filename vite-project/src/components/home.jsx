import { useEffect, useState } from 'react';

import '../App.css';

import InPageNavigation, { activeTabRef } from './utils/inpagenavigation';
import LatestBlogCard from './home/latest-blog-card';
import axios from 'axios';
import MinimalCard from './home/minimal-card';
import { FaArrowTrendDown } from "react-icons/fa6";
import NoData from './home/no-data-msg';
import { FilterPagination } from './home/filter-pagination';
import LoadMoreBtn from './utils/load-more-btn';




const Home = ({searchBoxVis}) => {
    
    const [latestBlogs, setLatestBlogs] = useState(null)
    const [trendingBlogs, setTrendingBlogs] = useState(null)
    const [pageState,setPageState] = useState("home");

   

    const cat = ["coding","food" , "tech", "travel",  "education", "business"]

    const getLatestBlogs = ({page = 1}) => {
        axios.post("http://localhost:5000/api/blog/latestblogs",{page})
            .then(async({ data }) => {
                console.log(data)
                let formatedData = await FilterPagination({
                    state: latestBlogs,
                    data: data.blogs,
                    page,
                    count_route: "get-all-blogs"
                })
                console.log(formatedData)
                setLatestBlogs(formatedData)
                
            })
            .catch(err => console.log(err))
    }
    const getTrendingBlogs = () => {
        axios.get("http://localhost:5000/api/blog/trendingblogs")
            .then(({ data }) => {
                console.log(data.blogs)
                setTrendingBlogs(data.blogs)
                console.log(trendingBlogs)
            })
            .catch(err => console.log(err))
    }


    const getBlogsByCat = ({page = 1}) => {
        axios.post("http://localhost:5000/api/blog/searchblog" , {tag : pageState , page})
            .then(async({ data }) => {
                let formatedData = await FilterPagination({
                    state: latestBlogs,
                    data: data.blogs,
                    page,
                    count_route: "search-blogs-count",
                    data_to_send : {tag: pageState},
                })
                console.log(formatedData)
                setLatestBlogs(formatedData)
            })
            .catch(err => console.log(err))
    }
        

    const loadByCat = (e) => {
        let cat = e.target.innerText.toLowerCase();

        
        setLatestBlogs(null)
        
        setPageState(cat)
    }
    useEffect(() => {
        activeTabRef.current.click();


        if(pageState === "home" && !latestBlogs){
            getLatestBlogs({ page : 1 });
        }else{
            getBlogsByCat({page : 1});
        }
        
        if(!trendingBlogs){
            getTrendingBlogs();
        }
    }, [pageState])



    return (
        <div className={`h-cover w-full md:pt-0 ${searchBoxVis ? "pt-[80px]" : "pt-0"} duration-300`}>
            

            <div className='flex md:px-[50px] px-3 pt-3'>
                {/* latest blogs */}
                <div className='w-full px-5 md:px-8'>
                    <InPageNavigation routes={[pageState, "Trending Blogs"]} defaultHidden={["Trending Blogs"]}>
                        <>
                            {
                                latestBlogs == null ? <p>Loading...</p> : (
                                    latestBlogs.results.length ? 
                                    latestBlogs.results.map((blog, i) => {
                                        return <LatestBlogCard content={blog} author={blog.author} key={i} />
                                    }) : <NoData message="No blogs found"/>
                                )

                                
                            }
                            <LoadMoreBtn state={latestBlogs} fetchFun={(pageState == "home" ? getLatestBlogs : getBlogsByCat)}/>
                        </>
                        {
                            trendingBlogs && trendingBlogs.map((blog, i) => {
                                return <MinimalCard key={i} blog={blog} i={i} />
                                
                            })
                        }
                    </InPageNavigation>
                </div>
                {/* filter and trending blogs */}
                <div className='min-w-[40%] lg:min-w-[400px] border-l-2 pl-8 pt-3 max-w-min max-md:hidden'>
                    <div className='flex flex-col gap-10 mb-10'>
                        <div>
                            <h1 className='text-[16px] mb-5 font-semibold'>Stories</h1>
                            <div>
                                {
                                    cat.map((cat, i) => {
                                        return <button onClick={loadByCat} className={`px-4 py-2 duration-300 rounded-full my-2 mx-2 ${cat === pageState ? "bg-black text-white" : "bg-gray-300 text-black"}`} key={i}>{cat}</button>
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-[16px] mb-8 font-semibold flex gap-2 items-center'>Trenidng <FaArrowTrendDown /></h1>
                        <div className='my-3'>
                            {
                                trendingBlogs == null ? <h1>Loading...</h1> : (
                                    trendingBlogs.length ? trendingBlogs.map((blog, i) => {
                                        return <MinimalCard key={i} blog={blog} i={i} />
                                    }) : <NoData message="No blogs found"/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}
export default Home;