import { NextFunction, Request, Response } from "express";
import { ICustomerCreate } from "../../../interfaces";
import { BadRequestError } from "../../../utils/error";

class customerBodyMiddleware {
  async create(req: Request, res: Response, next: NextFunction) {
    const { email, name, phone, password }: ICustomerCreate = req.body;

    if (!email || !name || !phone || !password) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const { email, name, phone, password } = req.body;

    if (!email && !name && !phone && !password) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async createPhone(req: Request, res: Response, next: NextFunction) {
    const { phone } = req.body;

    if (!phone) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async editPhone(req: Request, res: Response, next: NextFunction) {
    const { phone_id, phone } = req.body;

    if (!phone || !phone_id) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async deletePhone(req: Request, res: Response, next: NextFunction) {
    const { phone_id } = req.body;

    if (!phone_id) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async createEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async editEmail(req: Request, res: Response, next: NextFunction) {
    const { email_id, email } = req.body;

    if (!email || !email_id) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }

  async deleteEmail(req: Request, res: Response, next: NextFunction) {
    const { email_id, email } = req.body;

    if (!email || !email_id) {
      throw new BadRequestError("invalid body format");
    }

    next();
  }
}

export default new customerBodyMiddleware()