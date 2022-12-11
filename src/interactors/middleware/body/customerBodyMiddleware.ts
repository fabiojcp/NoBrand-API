import { NextFunction, Request, Response } from "express";
import { ICustomerCreate } from "../../../interfaces";
import { BadRequestError } from "../../../utils/error";

class customerBodyMiddleware {
  async create(req: Request, res: Response, next: NextFunction) {
    const { email, name, phone, password }: ICustomerCreate = req.body;

    if (!email || !name || !phone || !password) {
      throw new BadRequestError("invalid body format");
    }
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof phone !== "string" ||
      typeof password !== "string"
    ) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const { email, name, phone, password } = req.body;

    if (!email && !name && !phone && !password) {
      throw new BadRequestError("invalid body format");
    }

    if (
      (typeof email !== "string" && email) ||
      (typeof name !== "string" && name) ||
      (typeof phone !== "string" && phone) ||
      (typeof password !== "string" && password)
    ) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async createPhone(req: Request, res: Response, next: NextFunction) {
    const { phone } = req.body;

    if (!phone) {
      throw new BadRequestError("invalid body format");
    }

    if (typeof phone !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async editPhone(req: Request, res: Response, next: NextFunction) {
    const { phone_id, phone } = req.body;

    if (!phone || !phone_id) {
      throw new BadRequestError("invalid body format");
    }

    if (typeof phone !== "string" || typeof phone_id !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async deletePhone(req: Request, res: Response, next: NextFunction) {
    const { phone_id } = req.body;

    if (!phone_id) {
      throw new BadRequestError("invalid body format");
    }

    if (typeof phone_id !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async createEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError("invalid body format");
    }

    if (typeof email !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async editEmail(req: Request, res: Response, next: NextFunction) {
    const { email_id, email } = req.body;

    if (!email || !email_id) {
      throw new BadRequestError("invalid body format");
    }

    if (typeof email !== "string" || typeof email_id !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async deleteEmail(req: Request, res: Response, next: NextFunction) {
    const { email_id } = req.body;

    if (!email_id) {
      throw new BadRequestError("invalid body format");
    }

    if (typeof email_id !== "string") {
      throw new BadRequestError("invalid body format");
    }

    next();
  }
}

export default new customerBodyMiddleware();
