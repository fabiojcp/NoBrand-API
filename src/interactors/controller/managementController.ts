import { Request, Response } from "express";
import { ICustomerCreate, IManagerCreate } from "../../interfaces";
import managementService from "../service/managementService";

class ManagerController {
  async create(req: Request, res: Response) {
    const { email, name, phone, password, secretKey }: IManagerCreate =
      req.body;
    const ip = req.ip;

    const manager = await managementService.create({
      ip,
      email,
      name,
      phone,
      password,
      secretKey,
    });

    return res.json({ message: "manager created" });
  }

  async readUsers(req: Request, res: Response) {
    const userId = req.user.id;

    const users = await managementService.readUsers(userId);

    return res.status(201).json({ users });
  }
}

export default new ManagerController();
