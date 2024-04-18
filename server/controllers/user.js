import User from "../Database/User.js";

export const FindUser =  (req,res) => {
    let {query} = req.body;

    User.find({"personal_info.username" : new RegExp(query , 'i')})
    .limit(30)
    .select("personal_info.name personal_info.username personal_info.profile_img -_id")
    .then(users => {
        return res.status(200).json({users})
    })
    .catch(err=>{
        console.log(err)
    })
}

export const UserDetails = (req,res) => {
    let {uname} = req.body;

    User.findOne({"personal_info.username" : uname})
    .select("-personal_info.password -google_auth -blogs -updatedAt")
    .then(user=>{
        return res.status(201).json(user)
    })
    .catch(err=>{
        return res.status(401).json(err.message)
    })
}