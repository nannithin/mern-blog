 
 
 const LoadMoreBtn = ({state , fetchFun}) => {
    if(state!==null && state.total_docs > state.results.length){
        return(
            <button onClick={()=>fetchFun({page : (state.page)+1})} className="text-textColor border-[2px] border-black text-[15px] py-2 px-4 rounded-md duration-300 hover:bg-black hover:text-white">LOAD MORE</button>
            )
    }
}

export default LoadMoreBtn;

