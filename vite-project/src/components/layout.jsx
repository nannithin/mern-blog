
import CreateWithEmail from "./auth/create_email";
import Login from "./auth/login";
import Signup from "./auth/signup";
import { Routes, Route } from "react-router-dom";
import Private from "./private/private";
import Editor from "./editor";
import Header from "./header";
import Home from "./home";
import SearchPage from "./search-page";

import NotFound from "./not-found-page";
import { useState } from "react";
import UserProfile from "./user-profile";
import Blog from "./blog";

const Layout = () => {
    const [searchBoxVis, setSearchBoxVis] = useState(false);
    return (
        <div>

            <Routes>
                <Route path="/auth/signin" element={<Signup />} />
                <Route path="/auth/signup" element={<Login />} />
                <Route path="/auth/createwithemail" element={<CreateWithEmail />} />

                <Route path="/" element={<Header searchBoxVis={searchBoxVis} setSearchBoxVis={setSearchBoxVis} />}>
                    <Route index element={<Home searchBoxVis={searchBoxVis} />} />
                    <Route path="search/:query" element={<SearchPage />} />
                    <Route path="user/:id" element={<UserProfile />} />
                    <Route path="blog/:id" element={<Blog />} />
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route element={<Private />}>
                    <Route path="/create-blog" element={<Editor />} />
                    <Route path="/create-blog/:blog_id" element={<Editor />} />
                </Route>

            </Routes>
        </div>
    )
}

export default Layout;