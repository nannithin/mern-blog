import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "./editor";
import defaultBlog from "../assets/blog banner.png";
import {getDownloadURL,getStorage,ref,uploadBytesResumable,} from 'firebase/storage';
import { app } from "./utils/firebase";
import {Toaster,toast} from "react-hot-toast";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./utils/toolsBlog";

const CreateBlog = () => {
    
    let {blog : {title,banner,content,tags,des},setBlog,blog,setTextEditor,textEditor,editorState,setEditorState} = useContext(EditorContext);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const filePickerRef = useRef()
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
    let loadingToast;

    useEffect(()=>{
        setTextEditor(new EditorJS({
            holder: "textEditor",
            data : Array.isArray(content) ? content[0] : content,
            placeholder: "Let write an awesome story",
            tools: tools
        }))
    },[])

    const handlePublishEvent = () => {
        if(!banner.length){
            return toast.error("Upload a banner to publish");
        }
        if(!title.length){
            return toast.error("Write a blog title to publish")
        }
        if(textEditor.isReady){
            textEditor.save().then(data=>{
                if(data.blocks.length){
                    setBlog({...blog,content : data});
                    setEditorState("publish")
                }
                else{
                    return toast.error("Write something to publish")
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
        setImageFile(file);
        loadingToast = toast.loading("Uploading...");
        }
    }

    //set up your firebase
    const uploadImage = async() => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,imageFile);
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setImageFileUploadProgress(progress.toFixed(0));

        },
        (error)=>{
            console.log(error)
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            toast.error("Failed")
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                toast.dismiss(loadingToast);
                setBlog({...blog,banner : downloadURL})
                toast.success("Uploaded 👍")
            })
        }
        )
    }
    const handleError = (e) => {
        let img = e.target;
        img.src = defaultBlog;
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile])
    
    

    const handleKeyDown = (e) => {
        if(e.keyCode == 13){
            e.preventDefault();
        }

    }

    const handleTitle = (e) => {
        let input = e.target;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';

        setBlog({...blog , title : input.value})
    }


    return (
        <div className="">
            <Toaster></Toaster>
            <div className="h-[80px] bg-white top-0 sticky z-10 flex px-5 border-b-gray-200 border-[2px] items-center justify-between">
                <h1 className="text-[20px] font-semibold">BLOG</h1>
                <p className="hidden md:block">{title.length ? title : ""}</p>
                <div className="flex gap-5">
                    <button onClick={handlePublishEvent} className="bg-black text-white py-2 px-4 rounded-[25px]">PUBLISH</button>
                    <button className="bg-[#F3F3F3] py-2 px-4 rounded-[25px]">DRAFT</button>
                </div>
            </div>
            <div className="mt-[50px] max-w-[500px] px-5 mx-auto -z-10">
                <input className="hidden" type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
                <div onClick={()=>filePickerRef.current.click()} className=" cursor-pointer rounded-lg relative text-center ">
                    <img onError={handleError} className="w-full h-[250px] rounded-lg bg-cover " src={banner} alt="" />
                </div>
                <textarea defaultValue={title} onKeyDown={handleKeyDown} onChange={handleTitle} placeholder="Heading" className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"></textarea>
                <div className="w-full h-[1px] my-5 bg-gray-300" />
                <div id="textEditor"></div>
            </div>
        </div>
    )
}

export default CreateBlog;
