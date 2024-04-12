import Express from "express";
import { loginAdmin } from "../controllers/admin.controller";

const adminRouter = Express.Router()

adminRouter.post('/api/auth/login',loginAdmin)

export default adminRouter