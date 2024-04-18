import { Link } from "react-router-dom";
import {  getFullDay } from "./utils/date";

const About = ({social_links , joinedAt , bio , className}) => {
    
    
    return(
        <div className={"md:w-[90%] md:mt-6 " + className}>
            <p className="text-textColor mb-5 leading-7">{bio.length ? bio : "Nothing to read"}</p>
            <div className=" text-textColor mb-3">
                {
                    Object.keys(social_links).map((item,i)=>{
                        let link = social_links[item]
                        return link ? <Link to={link} key={i} target="_blank"><i className={"fi " + (item!=="website" ? "fi-brands-"+item : "fi-rr-globe") + " text-[19px] mx-2"}></i></Link> : ""
                    })
                }
            </div>
            <p className="text-textColor text-[15px] md:text-[17px]">created on {getFullDay(joinedAt)}</p>
        </div>
    )
}

export default About;