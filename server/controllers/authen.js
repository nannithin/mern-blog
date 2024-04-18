import User from "../Database/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { getAuth } from "firebase-admin/auth";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.json("All fields are required");
  }
  else {
    let existinguser;
    try {
      existinguser = await User.findOne({ 'personal_info.email': email });

    } catch (error) {
      console.log(error);
    }
    if (existinguser) {
      return res.json({message : "Email already registered",access : false})
    }
    else {
      try {
        const salt = await bcryptjs.genSalt(10);
        const hashedpass = await bcryptjs.hash(password, salt);
        let username = email.split("@")[0];
        const newUser = new User({
          personal_info: { name,username, email, password: hashedpass },
          google_auth: false
        });

        await newUser.save();

        const user = await User.findOne({ 'personal_info.email': email }).select("personal_info.name personal_info.username personal_info.email personal_info.profile_img")
        const payload = {
          id: user._id,
          name: user.personal_info.name
        }
        

        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
        res.cookie('token', token, {
          path: '/',
          expires: new Date(Date.now() + 1000*60*60*24*7),
          httpOnly: true,
          sameSite: "lax"
        })

        const userDataWithoutPassword = user.toObject();

        delete userDataWithoutPassword._id;
        
        return res.json({
          user : userDataWithoutPassword,
          access : true
        })
      } catch (error) {
        console.log(error);
        return res.json({message : "Something went wrong",access : false})
      }
    }
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json("All fields are required")
  }
  else {
    const user = await User.findOne({ 'personal_info.email': email }).select("personal_info.name personal_info.username personal_info.profile_img personal_info.email personal_info.password")

    try {
      if (user) {
        const isPassCorrect = await bcryptjs.compare(password, user.personal_info.password);
        console.log(isPassCorrect);
        if (isPassCorrect) {

          const payload = {
            id: user._id,
            name: user.personal_info.name
          }
          const userDataWithoutPassword = user.toObject();
          delete userDataWithoutPassword.personal_info.password;
          delete userDataWithoutPassword._id;

          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
          
          res.cookie('token',token,{
            path: '/',
            expires: new Date(Date.now() + 1000*60*60*24*7 ),
            httpOnly: true,
            sameSite: "lax"
          })

          return res.json({
            "user" : userDataWithoutPassword,
            "access" : true
          });

        }
        else {
          return res.json({
            message : "Incorrect password",
            access : false
          })
        }
      } else {
        return res.json({
          message : "User not found",
          access: false
        })
      }
    } catch (error) {
      console.log(error)
      return res.json("something went wrong in server")
    }
  }
}

export const VerifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token Missing");
  }
  else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token Invalid" })
      }
      else {
        req.user = decoded.id;
        next();
      }
    })
  }

}

export const isLogin = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false)
  }
  else {
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (decoded.id) {
        return res.json(true);
      }
    } catch (error) {
      
      return res.json(false)
    }
  }
}

export const GoogleAuth = async (req, res) => {
  const { access_token } = req.body;
  let newuser;
  //console.log(access_token);
  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;
      console.log(email)
      picture = picture.replace("s96-c", "s384-c");
      let user = await User.findOne({ 'personal_info.email': email }).select("personal_info.name personal_info.username personal_info.email personal_info.profile_img google_auth")
      if (user) {
        if (!user.google_auth) {
          return res.json("Try with your email and password")
        }
      }
      else{
        let username = email.split("@")[0];
        user = new User({
          personal_info: { name,username, email, profile_img: picture },
          google_auth: true
        })
        await user.save();
         
      }

      newuser = await User.findOne({ 'personal_info.email': email }).select("personal_info.name personal_info.username personal_info.email personal_info.profile_img")
      
      const payload = {
        id: newuser._id,
        name: newuser.personal_info.name
      }
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
      res.cookie('token', token, {
        path: '/',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 * 7),
        httpOnly: true,
        sameSite: "lax"
      })

      const userDataWithoutId = newuser.toObject();

        delete userDataWithoutId._id;



      return res.json(userDataWithoutId)

    })
    .catch(err => {
      console.log(err)
    })

}

