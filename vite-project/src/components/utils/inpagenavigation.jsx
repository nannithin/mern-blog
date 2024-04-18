import { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let activeTabRef;
/* eslint-disable react/prop-types */
const InPageNavigation = ({ routes, defaultHidden = [] , defaultIndex = 0 , children }) => {
    const [inPageNavIn,setInPageNavIn] = useState(defaultIndex);

     activeTabLineRef = useRef();
     activeTabRef = useRef();

    const changePageState = (btn,i) => {
        let {offsetWidth, offsetLeft} = btn;
        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";
        setInPageNavIn(i);
        }

        useEffect(()=>{
            changePageState(activeTabRef.current,defaultIndex)
        },[])

    return(
        <>
        <div className="relative mb-8 text-black flex flex-nowrap overflow-x-auto">
            {
                routes.map((route,i)=>{
                    
                    return (
                        
                        <button ref={i == defaultIndex ? activeTabRef : null} onClick={(e)=>{changePageState(e.target,i)}} className={"text-[15px] md:text-[17px] p-4 px-5 capitalize  "  + (inPageNavIn == i ? "text-black" : "text-textColor ")+(defaultHidden.includes(route) ? "md:hidden " : " ")} key={i}>{route}</button>
                    )
                })
            }
            <div ref={activeTabLineRef} className="absolute h-[2px] rounded-full bg-textColor bottom-0 duration-300"  ></div>
        </div>

        {Array.isArray(children) ? children[inPageNavIn] : children}
        </>
    )
}
export default InPageNavigation;