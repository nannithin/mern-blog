import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { EditorContext } from "./editor";
import Tag from "./tags";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const PublishBlog = () => {
    let  {blog_id} = useParams();
    let charlimit = 200;
    let tagLimit = 5;
    let loading;
    const navigate = useNavigate();
    let {blog,blog:{banner,title,content,tags,des},setEditorState,setBlog} = useContext(EditorContext);
    const handleClose = () => {
        setEditorState("editor")
    }

    const handleTitle = (e) => {
        let inp = e.target;
        setBlog({...blog,title : inp.value})
    }

    const handleDes = (e) => {
        let inp = e.target;
        setBlog({...blog,des:inp.value})
    }

    const handleKeyDown = (e) => {
        if(e.keyCode == 13){
            e.preventDefault();
        }

    }
    const handleTagDown = (e) => {
        if(e.keyCode == 13 || e.keyCode == 188){
            e.preventDefault();
            let tag = e.target.value;
            if(tags.length < tagLimit){
                if(!tags.includes(tag) && tag.length){
                    setBlog({...blog,tags: [...tags,tag]})
                    e.target.value = "";
                }
            }else{
                toast.error(`You can add max ${tagLimit} tags`)
            }
        }
    }

    const publishForm = (e) => {
        if(e.target.className.includes('disable')){
            return;
        }
        if(!title.length){
            return toast.error("Write title to publish")
        }
        if(!des.length){
            return toast.error("Write description to publish")
        }
        if(!tags.length || tags.length > tagLimit){
            return toast.error(`Add tags min 1 and max ${tagLimit}`)
        }
        loading = toast.loading("Publishing...");
        e.target.classList.add('disable');
        let blogObj = {
            title,banner,tags,content,des
        }
        axios.post("http://localhost:5000/api/blog/create",{...blogObj , b_id : blog_id},{withCredentials : true})
        .then(()=>{
            e.target.classList.remove('disable');
            toast.dismiss(loading);
            toast.success("Published...");
            setTimeout(()=>{
                navigate("/");
            },500)
        }).catch(({response})=>{
            e.target.classList.remove('disable');
            toast.remove(loading)
            return toast.error(response.data.error)
        })

    }


    return(
        <div className="w-full min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
            <Toaster/>
            <button onClick={handleClose} className="text-3xl absolute right-[5vw] z-10 top-[5%] lg:top-[10%]">
                <IoCloseSharp/>
            </button>
            <div className="w-[300px] md:w-[400px] lg:w-[500px] block mx-auto p-4">
                <p className="text-[#6B6B6B]">Preview</p>
                <div className="w-full rounded-lg my-2 md:my-4 aspect-video overflow-hidden ">
                   <img className="w-full h-[250px] rounded-lg bg-cover bg-no-repeat" src={banner} alt="" />
                </div>
                <h1 className="text-4xl leading-tight font-medium mt-2 line-clamp-2">{title}</h1>
                <p className="line-clamp-2 text-[17px] leading-7 mt-4">{des}</p>
            </div>
            <div className="w-[300px] md:w-[400px] lg:w-[500px] mx-auto lg:mx-0 border-[#F3F3F3] lg:border-1  lg:pl-8  ">
                <p className="text-[#6B6B6B] mb-2 mt-9">Blog Title</p>
                <input className="pl-4 rounded-md bg-[#F3F3F3] outline-none w-full border border-[#F3F3F3] p-3 focus:bg-transparent placeholder:text-black" type="text" onKeyDown={handleKeyDown} defaultValue={title} onChange={handleTitle} placeholder="Blog title" />

                <p className="text-[#6B6B6B] mb-2 mt-9">Short description</p>
                <textarea maxLength={charlimit} defaultValue={des} className="h-40 resize-none leading-7 pl-4 rounded-md bg-[#F3F3F3] w-full border border-[#F3F3F3] outline-none p-3 focus:bg-transparent placeholder:text-black" onChange={handleDes}></textarea>
                <p className="mt-1 text-right text-sm text-textColor">{charlimit-des.length} Characters left</p>
                <p className="text-[#6B6B6B] mt-9 mb-2 ">Tags - (Helps in searching)</p>
                <div className="relative px-2 py-2 pb-[50px] max-h-[200px] rounded-md bg-[#F3F3F3] w-full border border-[#F3F3F3]">
                    <input onKeyDown={handleTagDown} type="text" placeholder="Tags" className="sticky bg-white top-0 left-0 pl-4 mb-3 w-full outline-none rounded-md py-3 " />
                    { tags.map((tag,ind)=>{
                       return <Tag key={ind} tag={tag} ind={ind}/>
                    }) }
                </div>
                <p className="text-[#6B6B6B] mt-1 mb-4 text-right text-sm">{tagLimit - tags.length} Tags Left</p>
                <button onClick={publishForm} className="bg-black text-white py-2 px-4 rounded-[25px]">PUBLISH</button>
            </div>
        </div>
    )
}

export default PublishBlog;