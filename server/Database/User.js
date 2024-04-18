import mongoose from "mongoose";
import { Schema } from "mongoose";


const User = Schema({

    personal_info: {
        name: {
            type: String,
            required: true,
            
        },
        username: {
            type: String,
            minlength: [3, 'Username must be 3 letters long'],
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type : String
        },
        
        bio: {
            type: String,
            maxlength: [200, 'Bio should not be more than 200'],
            default: "",
        },
        profile_img: {
            type: String,
            default: "https://i.pinimg.com/564x/b4/3b/f3/b43bf303f475ddeb69751c67c1ae3856.jpg"
        },
    },
    social_links: {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        }
    },
    account_info:{
        total_posts: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
    },
    google_auth: {
        type: Boolean,
        default: false
    },
    blogs : {
        type : [Schema.Types.ObjectId],
        ref: 'Blogs',
        default: []
    }
    

}, 
{ 
    timestamps: {
        createdAt: 'joinedAt'
    } 

})


export default mongoose.model("User",User);