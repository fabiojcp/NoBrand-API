import { Router } from "express";
import authController from "../controller/authController";
import authBodyMiddleware from "../middleware/body/authBodyMiddleware";

const LoginRoutes = Router()

// customer
LoginRoutes.post("/", authBodyMiddleware.login, authController.customer)

// Adm
LoginRoutes.post("/management/", authBodyMiddleware.login, authController.manager)

export default LoginRoutes