import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { liveInterview } from "../controllers/auth/interview.js"
const router = express.Router()

router.post("/liveInterview",authMiddleware,liveInterview)

export default router