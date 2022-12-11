import { Router } from "express";
import authController from "../controller/authController";

const LoginRoutes = Router()

// customer
LoginRoutes.post("/", authController.customer)

// Adm
LoginRoutes.post("/management/", authController.manager)

export default LoginRoutes