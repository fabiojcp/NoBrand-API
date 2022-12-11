import "express-async-errors";
import express from "express";
import { Express } from "express";

import cors from "cors";

import AdmRoutes from "./interactors/routes/admRoutes";
import CustomerRoutes from "./interactors/routes/customerRoutes";
import errorMiddleware from "./interactors/middleware/error";
import LoginRoutes from "./interactors/routes/authRoutes";

class App {
  server: any;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  async enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,POST,PATCH,DELETE",
      origin: "*",
    };

    this.server.use(cors(options));
  }

  async middlewares() {
    this.enableCors();
    this.server.use(express.json());
  }

  async routes() {
    this.server.use("/customer", CustomerRoutes);
    this.server.use("/manager", AdmRoutes);
    this.server.use("/auth", LoginRoutes)
    this.server.use(errorMiddleware);
  }
}

export default new App().server;
