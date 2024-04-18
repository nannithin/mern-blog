import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import About from "./about";
import { FilterPagination } from "./home/filter-pagination";
import InPageNavigation from "./utils/inpagenavigation";
import LoadMoreBtn from "./utils/load-more-btn";
import LatestBlogCard from "./home/latest-blog-card";
import NoData from "./home/no-data-msg";
import NotFound from "./not-found-page";

export const ProfileDataStructer = {
    personal_info: {
        name: "",
        username: "",
        profile_img: "",
        bio: "",
    },
    social_links: {},
    account_info: {
        total_posts: 0,
        total_reads: 0
    },
    joinedAt: ""
}

const UserProfile = () => {
    let { id: profileId } = useParams()
    const [profile, setProfile] = useState(ProfileDataStructer);
    const [blogs, setBlogs] = useState(null)
    const [loadedprofile, setLoadedProfile] = useState("")
    let { userAuth: { username } } = useContext(UserContext);


    let { personal_info: { name, username: profile_name, profile_img, bio }, account_info: { total_posts, total_reads }, social_links, joinedAt } = profile;
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = () => {
        axios.post("http://localhost:5000/api/blog/getuser", { uname: profileId })
            .then(({ data }) => {
                if (data) {
                    setProfile(data);
                }
                setLoadedProfile(profileId)
                getBlogs({ user_id: data._id })
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const getBlogs = ({ page = 1, user_id }) => {
        user_id = user_id == undefined ? blogs.user_id : user_id;

        axios.post("http://localhost:5000/api/blog/searchblog", { author: user_id, page })
            .then(async ({ data }) => {
                let formatedData = await FilterPagination({
                    state: blogs,
                    data: data.blogs,
                    page,
                    count_route: "search-blogs-count",
                    data_to_send: { author: user_id },

                })
                formatedData.user_id = user_id;
                setBlogs(formatedData)
                setLoading(false)
            })

    }


    useEffect(() => {

        if (profileId !== loadedprofile) {
            setBlogs(null)
        }

        if (blogs == null) {
            resetState();
            fetchUserProfile();
        }


    }, [profileId, blogs])

    const resetState = () => {
        setProfile(ProfileDataStructer)
        setLoading(true)
        setLoadedProfile("")
    }


    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                    profile_name ?
                        <section className="h-cover md:px-10 px-3 pt-10 md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
                            <div className="flex flex-col gap-3 min-w-[250px] max-md:items-center md:w-[50%] md:pl-12 md:border-l-2 md:sticky md:top-[100px] md:py-10">
                                <img className="w-[130px] h-[130px] rounded-full md:w-32 md:h-32 bg-grey" src={profile_img} alt="" />
                                <h1 className="text-[17px] md:text-[19px]">{name}</h1>
                                <p className="text-textColor text-[15px]">@{profile_name}</p>
                                <p>{total_posts.toLocaleString()} Blogs  -  {total_reads.toLocaleString()} Reads</p>
                                <div>
                                    {
                                        profile_name == username ?
                                            <Link to="/settings/edit-profile"><button className=" px-[16px] py-[7px] text-[13px] bg-grey ">EDIT PROFILE</button></Link> : ""
                                    }
                                </div>
                                <About social_links={social_links} bio={bio} joinedAt={joinedAt} className={"max-md:hidden"} />
                            </div>
                            <div className="max-md:mt-12 w-full">
                                <InPageNavigation routes={["Blogs", "About"]} defaultHidden={["About"]}>
                                    <>
                                        {

                                            blogs == null ? <p>Loading...</p> : (
                                                blogs.results.length ?
                                                    blogs.results.map((blog, i) => {
                                                        return <LatestBlogCard content={blog} author={blog.author} key={i} />
                                                    }) : <NoData message="No blogs found" />
                                            )


                                        }
                                        <LoadMoreBtn state={blogs} fetchFun={getBlogs} />
                                    </>
                                    <About social_links={social_links} bio={bio} joinedAt={joinedAt} />
                                </InPageNavigation>
                            </div>
                        </section>
                        : <NotFound />
            }
        </div>
    )
}

export default UserProfile;