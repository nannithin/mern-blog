import express from "express";
import authRoutes from "./authroutes.js";
import userRoutes from "./userroutes.js"

const router = express.Router();
router.use('/auth',authRoutes);
router.use('/blog',userRoutes);

export default router;