import { Router } from "express";
import customerController from "../controller/customerController";
import customerBodyMiddleware from "../middleware/body/customerBodyMiddleware";
import TokenMiddleware from "../middleware/token";

const CustomerRoutes = Router();

// create user ok
CustomerRoutes.post(
  "/",
  customerBodyMiddleware.create,
  customerController.create
);

//read Customer info
CustomerRoutes.get(
  "/",
  TokenMiddleware.customer,
  customerController.customerData
);

// edit basic info (name, password) ok
CustomerRoutes.patch(
  "/",
  TokenMiddleware.customer,
  customerBodyMiddleware.edit,
  customerController.edit
);

// create second phone info ok
CustomerRoutes.post(
  "/phones/",
  TokenMiddleware.customer,
  customerBodyMiddleware.createPhone,
  customerController.createPhone
);

// edit phone info ok
CustomerRoutes.patch(
  "/phones/",
  TokenMiddleware.customer,
  customerBodyMiddleware.editPhone,
  customerController.editPhone
);

//delete phone info
CustomerRoutes.delete(
  "/phones/",
  TokenMiddleware.customer,
  customerBodyMiddleware.deletePhone,
  customerController.deletePhone
);

// create email info
CustomerRoutes.patch(
  "/email/",
  TokenMiddleware.customer,
  customerBodyMiddleware.createEmail,
  customerController.createEmail
);

//edit email info
CustomerRoutes.patch(
  "/email/",
  TokenMiddleware.customer,
  customerBodyMiddleware.editEmail,
  customerController.editEmail
);

//delete email info
CustomerRoutes.delete(
  "/email/",
  TokenMiddleware.customer,
  customerBodyMiddleware.deleteEmail,
  customerController.deleteEmail
);

export default CustomerRoutes;
