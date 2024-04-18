import express from"express";
import {register,Login, isLogin, GoogleAuth} from "../controllers/authen.js";

const router = express.Router();

router.post('/register',register);
router.post('/login',Login);
router.get('/islogin',isLogin);
router.post('/google_auth',GoogleAuth)

export default router;