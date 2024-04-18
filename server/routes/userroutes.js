import  express from "express";
import  { VerifyToken } from "../controllers/authen.js";
import  { createBlog,  getAllBlogs,  getBlog,  latestBlogs, searchBlogCount, searchBlogs, trendingBlogs } from "../controllers/blog.js";
import { FindUser, UserDetails } from "../controllers/user.js";


const router = express.Router();

router.post('/create',VerifyToken,createBlog)
router.post('/latestblogs',latestBlogs)
router.get('/trendingblogs',trendingBlogs);
router.post('/searchblog',searchBlogs)
router.post('/get-all-blogs',getAllBlogs);
router.post('/search-blogs-count',searchBlogCount)
router.post('/getblog',VerifyToken,getBlog)

//users

router.post('/search-users',FindUser)
router.post('/getuser',UserDetails)

export default router;