import { NextFunction, Request, Response } from "express";
import { IManagerCreate } from "../../../interfaces";
import { BadRequestError } from "../../../utils/error";

class ManagerBodyMiddleware {
  async create(req: Request, res: Response, next: NextFunction) {
    const { email, name, phone, password, secretKey }: IManagerCreate =
      req.body;

    if (!email || !name || !phone || !password || !secretKey) {
      throw new BadRequestError("invalid body format");
    }
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof phone !== "string" ||
      typeof password !== "string" ||
      typeof secretKey !== "string"
    ) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }
}

export default new ManagerBodyMiddleware();
