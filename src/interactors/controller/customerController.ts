import { Request, Response } from "express";
import { ICustomerCreate } from "../../interfaces";
import CustomerService from "../service/customerService";

class CustomerController {
  async create (req: Request, res: Response) {
    const { email, name, phone, password }: ICustomerCreate = req.body;
    const ip = req.ip;

    const customer = await CustomerService.create({
      ip,
      email,
      name,
      phone,
      password,
    });

    return res.status(201).json({customer});
  }

  async customerData(req: Request, res: Response) {
    const customer_id : string = req.user.id;
    const ip = req.ip;

    const customer = await CustomerService.customerData(customer_id, ip);

    return res.json(customer);
  }

  async edit(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { email, name, phone, password } = req.body;
    const ip = req.ip;

    await CustomerService.edit({ ip, customer_id, email, name, phone, password });

    return res.status(204).json();
  }

  async createPhone(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { phone } = req.body;
    const ip = req.ip;

    await CustomerService.createPhone(customer_id, phone, ip);

    return res.status(201).json({ message: "phone created" });
  }

  async editPhone(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { phone_id, phone } = req.body;
    const ip = req.ip;

    await CustomerService.editPhone(customer_id, phone_id, phone, ip);

    return res.json({message: "phone updated successfully"});
  }

  async deletePhone(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { phone_id } = req.body;
    const ip = req.ip;

    await CustomerService.deletePhone(customer_id, phone_id, ip);

    return res.status(204).send();
  }

  async createEmail(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { email } = req.body;
    const ip = req.ip;

    await CustomerService.createEmail(customer_id, email,ip);

    return res.status(201).json({ message: "email created" });
  }

  async editEmail(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { email_id, email } = req.body;
    const ip = req.ip;

    await CustomerService.editEmail(customer_id, email_id, email, ip);

    return res.json({message: "email updated successfully"});
  }

  async deleteEmail(req: Request, res: Response) {
    const customer_id = req.user.id;
    const { email_id, email } = req.body;
    const ip = req.ip;

    await CustomerService.deleteEmail(customer_id, email_id, ip);

    return res.status(204).send();
  }
}

export default new CustomerController();