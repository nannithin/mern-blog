

const Nav = () => {
    const navLinks = [
        {
            name : "Home",
            link : "/",
        },
        {
            name : "Home",
            link : "/",
        },
        {
            name : "Home",
            link : "/",
        },
        {
            name : "Home",
            link : "/",
        }
    ]

    return(
        <div className="px-[4rem]">
           <nav className="flex justify-between h-[80px] items-center">
            <div>
                <h1 className="text-2xl">Logo</h1>
            </div>
            <div>
                <ul className="flex gap-[2rem] text-[19px]">
                    {
                        navLinks.map((item,ind)=>(
                            <li key={ind}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <button className=" px-4 py-2 rounded-md border-black border-2">sign up</button>
            </div>
           </nav>
        </div>
    )
}

export default Nav;