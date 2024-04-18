import { nanoid } from "nanoid";
import Blog from "../Database/blog.js";
import User from "../Database/User.js";

export const createBlog = async(req,res)=>{
    let id = req.user;
    let {title,banner,des,content,tags,draft,b_id} = req.body;
    
    if(!title.length){
        return res.status(500).json({error : "title required"})
    }
    if(!banner.length){
        return res.status(500).json({error : "banner required"})
    }
    if(!des.length){
        return res.status(500).json({error : "des required"})
    }
    if(!content.blocks.length){
        return res.status(500).json({error : "content required"})
    }
    if(tags.length < 0 || tags.length > 5){
        return res.status(500).json({error : "tags required"})
    }

    tags = tags.map(tag=>tag.toLowerCase());
    let blog_id = b_id || title.replace(/[^a-zA-Z0-9]/g,' ').replace(/\s+/g,"-").trim() + nanoid();
    
    if(b_id){
        
        Blog.findOneAndUpdate({blog_id},{title , banner , des , content , tags , draft : draft ? draft : false})
        .then(() => {
            return res.json({id : b_id})
        })
        .catch((err) => {
            return res.status(500).json({err : err.message})
        })
    }else{
        let blog_data = new Blog({
            title,banner,des,content,tags,author: id,blog_id,draft : Boolean(draft)
        })
        blog_data.save().then(blog=>{
            let incrementVal = draft ? 0 : 1;
             User.findOneAndUpdate({_id : id},{$inc : {"account_info.total_posts" : incrementVal},$push : {"blogs" : blog._id}}).then(user=>{
                return res.json({id : blog.blog_id})
            }).catch((err)=>{
                return res.json({error : err.message})
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    

}

export const latestBlogs = async(req,res)=>{

    let {page} = req.body;
    let limit = 7;
    await Blog.find({draft : false})
    .populate("author","personal_info.name personal_info.username personal_info.profile_img -_id")
    .sort({"joinedAt" : -1})
    .limit(limit)
    .select("blog_id title banner des publishedAt activity tags -_id")
    .skip((page - 1)*limit)
    .then(blogs => {
        return res.json({blogs})
    })
    .catch(err=>{
        console.log(err)
        return res.json("something error")
    })
}

export const trendingBlogs = async(req,res)=>{
    
    await Blog.find({draft : false})
    .populate("author","personal_info.name personal_info.username personal_info.profile_img -_id")
    .sort({"activity.total_read" : -1 , "activity.total_likes" : -1 , "joinedAt" : -1})
    .limit(5)
    .select("blog_id title banner des publishedAt activity tags -_id")
    .then(blogs => {
        return res.json({blogs})
    })
    .catch(err=>{
        console.log(err)
        return res.json("something error")
    })
}

export const searchBlogs = async(req,res)=>{
    let {tag , query , page , author , limit,elimate_blog} = req.body;
    
    let findQuery;

    if(tag){
        findQuery = {tags : tag,draft : false , blog_id : { $ne : elimate_blog }}
    }else if(query){
        findQuery = {title : new RegExp(query , 'i') ,draft : false}
    }else if(author){
        findQuery = {author,draft : false}
    }

    let maxlimit = limit ? limit : 2;

    await Blog.find(findQuery)
    .populate("author","personal_info.name personal_info.username personal_info.profile_img -_id")
    .sort({"joinedAt" : -1})
    .limit(maxlimit)
    .select("blog_id title banner des publishedAt activity tags -_id")
    .skip((page-1)*limit)
    .then(blogs => {
        return res.json({blogs})
    })
    .catch(err=>{
        console.log(err)
        return res.json("something error")
    })
    
}

export const getAllBlogs = async(req,res) => {
    Blog.countDocuments({draft : false})
    .then((count)=>{
        return res.status(201).json({total_docs : count})
    })
    .catch(err=>console.log(err))
}

export const searchBlogCount = async(req,res)=>{
    let {tag , author , query} = req.body;

    let findQuery;

    if(tag){
        findQuery = {tags : tag , draft : false}
    }else if(query){
        findQuery = {title : new RegExp(query , 'i') , draft : false}
    }else if(author){
        findQuery = {author,draft : false}
    }

    Blog.countDocuments(findQuery)
    .then(count=>{
        return res.status(201).json({total_docs : count})
    })
    .catch(err=>console.log(err))
}

export const getBlog = (req,res) => {
    let { blog_id , draft , mode } = req.body;

    const incrementVal = mode !== 'edit' ? 1 : 0;

    Blog.findOneAndUpdate({blog_id} , {$inc : {"activity.total_reads" : incrementVal}})
    .populate("author","personal_info.name personal_info.username personal_info.profile_img -_id")
    .select("title des content banner activity tags blog_id publishedAt")
    .then(blog => {
        User.findOneAndUpdate({"personal_info.username" : blog.author.personal_info.username} , {$inc : {"account_info.total_reads" : incrementVal}})
        .catch(err=>{
            return res.status(500).json({err : err.message})
        })
        return res.status(200).json( {blog} )
    })
    .catch(err=>{
        return res.status(401).json({err : err.message})
    })
}