import { Link } from "react-router-dom";
import CheckAuth from "../auth/useauth";

const UserCard = ({ user }) => {

    const {auth} = CheckAuth();

    let { personal_info: { name,username, profile_img: img } } = user;


    return (
        <Link to={auth ? `/user/${username}` : "/auth/signin"}>
            <div className="px-3 my-5 flex gap-5 items-center">
                <img className="w-[30px] h-[30px] object-cover rounded-full" src={img} />
                <div>
                    <h1 className="">{name}</h1>
                    <p className="text-[13px] md:text-[15px] text-textColor">@{username}</p>
                </div>
            </div>
        </Link>
    )
}

export default UserCard;