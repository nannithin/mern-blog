import { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { EditorContext } from "./editor";



const Tag = ({tag,ind}) => {
    let {blog,blog : {tags},setBlog} = useContext(EditorContext);
    console.log(tags)

    const addEditable = (e) => {
        e.target.setAttribute("contentEditable",true);
        e.target.focus();
    }
    const deleteTag = () => {
        tags = tags.filter(t => t!=tag);
        setBlog({...blog,tags})
    }

    const tagEdit = (e) => {
        if(e.keyCode == 13 || e.keyCode == 188){
            e.preventDefault();
            let curTag = e.target.innerText;
            tags[ind] = curTag;
            setBlog({...blog,tags});
            e.target.setAttribute("contentEditable",false);
        }
    }
    return(
        <div className="relative p-2 px-5 mt-2 mr-2 bg-white inline-block rounded-full hover:opacity-50 pr-10 text-textColor">
            <p className="outline-none" onKeyDown={tagEdit} onClick={addEditable} >{tag}</p>
            <button onClick={deleteTag} className="absolute right-3 top-1/2 mt-[2px] -translate-y-1/2">
                <IoCloseSharp className="text-sm pointer-events-none"/>
            </button>
        </div>
    )
}
export default Tag;