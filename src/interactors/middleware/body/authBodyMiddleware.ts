import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../utils/error";

class authBodyMiddleware {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password)  {
      throw new BadRequestError("invalid body format");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }
}

export default new authBodyMiddleware();
