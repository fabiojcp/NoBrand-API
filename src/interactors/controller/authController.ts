import { Request, Response } from "express";
import authService from "../service/authService";

class AuthController {
  async customer (req: Request, res: Response) {
    const { email, password } = req.body;
    const ip = req.ip;

    const token = await authService.customer(email, password, ip)

    return res.json({accessToken: token})
  }

  async manager (req: Request, res: Response) {
    const { email, password } = req.body;
    const ip = req.ip;

    const token = await authService.manager(email, password, ip)

    return res.json({accessToken: token})
  }
}

export default new AuthController()
