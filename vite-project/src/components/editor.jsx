import CreateBlog from "./createblog";
import { createContext, useEffect, useState } from "react";
import PublishBlog from "./publisBlog";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blogstructure = {
    title : '',
    banner : '',
    content : [],
    tags : [],
    des : '',
    author : {personal_info : {}}
}

export const EditorContext = createContext({})

const Editor = () => {

    let {blog_id} = useParams()

    const [blog,setBlog] = useState(Blogstructure);
    const [editorState,setEditorState] = useState("editor")
    const [textEditor,setTextEditor] = useState({isReady : false})
    const [Loading,setLoading] = useState(true)

    useEffect(() => {
        if(!blog_id){
            return setLoading(false)
        }
        axios.post("http://localhost:5000/api/blog/getblog" , {blog_id , draft : true , mode : 'edit'} , {withCredentials : true})
        .then(({data : {blog}}) => {
            setBlog(blog)
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(true)
            console.log(err)
        })
    },[])


    return(
        <div>
            <EditorContext.Provider value={{blog,setBlog,textEditor,setTextEditor,editorState,setEditorState}}>
                {
                    Loading ? <p className="text-center">Loading...</p> :
                editorState == "editor" ? <CreateBlog/> : <PublishBlog/>

                }
            </EditorContext.Provider>
            
        </div>
    )
}

export default Editor;