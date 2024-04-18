import { Link } from "react-router-dom";


const MinimalCard = ({ blog, i }) => {
    let { banner, title, blog_id: id, author: { personal_info: { name, profile_img } } } = blog;
    return (
        <Link to={`blog/${id}`} className="flex gap-5 pb-[20px]">
            <h1 className="text-4xl text-gray-300">{i < 10 ? "0" + (i + 1) : i + 1}</h1>

            <div className="flex flex-col gap-2">
                <h1 className="text-[17px] font-semibold">{title}</h1>
                <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                        <img className="w-[20px] h-[20px] rounded-full object-cover" src={profile_img} alt="" />
                        <p className="text-textColor text-[13px]">@{name}</p>
                    </div>
                    <p className="text-textColor text-[13px]">2hrs ago</p>
                </div>
            </div>
        </Link>
    )
}

export default MinimalCard;