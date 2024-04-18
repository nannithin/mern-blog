/* eslint-disable react/prop-types */
const Quote = ({quote , caption}) => {
    return(
        <div className="bg-purple-200 p-3 pl-5 my-5 md:my-9 border-l-4 border-purple-500">
            <p className="text-[17px] leading-10 md:text-[21px]">{quote}</p>
            {
                caption.length ? <p className="w-full text-base text-purple-500">{caption}</p> : ""
            }
        </div>
    )
}

const List = ({style,items}) => {
    return (
        <ol className={`pl-7 md:pl-10 ${style == 'ordered' ? "list-decimal" : "list-disc"} my-5 md:my-9`}>
            {
                items.map((item,i) => {
                    return <li key={i} className="my-4" dangerouslySetInnerHTML={{__html : item}}></li>
                })
            }
        </ol>
    )
}


const BlogContent = ({content}) => {
    
    let {type , data } = content;
    if(type == 'paragraph'){
        return <p className="my-5 md:my-9" dangerouslySetInnerHTML={{__html : data.text}}></p>
    }
    if(type == 'header'){
        return <h2 className="text-2xl my-5 md:my-9 font-bold" dangerouslySetInnerHTML={{__html : data.text}}></h2>
    }
    if(type == "quote"){
        return <Quote quote={data.text} caption={data.caption}/>
    }
    if(type == "list"){
        return <List style={data.style} items={data.items}/>
    }
}

export default BlogContent;