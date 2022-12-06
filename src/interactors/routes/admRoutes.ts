import { Router } from "express";

const AdmRoutes = Router()

// create user
AdmRoutes.post("/")

// *** for yourself CRUD ***

//edit basic info (name, password)
AdmRoutes.patch("/")

//edit phone info
AdmRoutes.patch("/phones/")

//edit email info
AdmRoutes.patch("/email/")

//delete phone info
AdmRoutes.delete("/phones/")

//delete email info
AdmRoutes.delete("/email/")

//read self info
AdmRoutes.get("/")

// *** for customers ***

//read unique customers info
AdmRoutes.get("/:customers_id")

//read customers info
AdmRoutes.get("/customers")

//edit basic info (name, password)
AdmRoutes.patch("/:customers_id")

//edit phone info
AdmRoutes.patch("/:customers_id/phones/")

//edit email info
AdmRoutes.patch("/:customers_id/email/")

//delete phone info
AdmRoutes.delete("/:customers_id/phones/")

//delete email info
AdmRoutes.delete("/:customers_id/email/")

export default AdmRoutes