import prismaConnect from "../../utils/dataBaseClient";
import { compareSync, hash } from "bcryptjs";
import { ICustomerCreate, ICustomerEdit } from "../../interfaces";
import {
  BadRequestError,
  ConflitError,
  ErrorHandler,
  UnauthorizedError,
} from "../../utils/error";
import { response } from "express";
import errorMiddleware from "../middleware/error";

class CustomerService {
  async create({ ip, email, name, phone, password }: ICustomerCreate) {
    const findUserEmail = await prismaConnect.users.findUnique({
      where: { email },
    });

    if (findUserEmail) {
      throw new ConflitError("this email is already registered");
    }

    const hashedPassword = await hash(password, 10);

    const customer = await prismaConnect.users.create({
      data: { name, password: hashedPassword, phone, email, isAdm: false },
      include: { userEmails: true, userPhones: true },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer.id, ip, type: "customer: create" },
    });

    return customer;
  }

  async customerData(customer_id: string, ip: string) {
    const findUser = await prismaConnect.users.findUnique({
      where: { id: customer_id },
      include: {
        cart: true,
        userEmails: true,
        userPhones: true,
      },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: get data" },
    });

    return findUser;
  }

  async edit({ customer_id, email, name, phone, password, ip }: ICustomerEdit) {
    const findUser = await prismaConnect.users.findUnique({
      where: { id: customer_id },
      include: {
        cart: true,
        userEmails: true,
        userPhones: true,
      },
    });

    if (
      findUser!.email == email &&
      email !== undefined &&
      findUser!.name == name &&
      name !== undefined &&
      findUser!.phone == phone &&
      email !== undefined &&
      compareSync(password, findUser!.password) &&
      password !== undefined
    ) {
      throw new ErrorHandler("No changes", 200);
    }

    const hashedPassword =
      password === undefined ? findUser!.password : await hash(password, 10);

    await prismaConnect.users.update({
      where: { id: customer_id },
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
      },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: edit data" },
    });

    return;
  }

  async createPhone(customer_id: string, phone: string, ip: string) {
    await prismaConnect.userPhones.create({
      data: { phone, UserId: customer_id },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: create phone" },
    });
    return;
  }

  async editPhone(
    customer_id: string,
    phone_id: string,
    phone: string,
    ip: string
  ) {
    const findPhoneOwner = await prismaConnect.userPhones.findUnique({
      where: { id: phone_id },
    });

    if (!findPhoneOwner) {
      throw new BadRequestError("phone not found");
    }

    if (findPhoneOwner?.UserId !== customer_id) {
      throw new UnauthorizedError("unhathorized");
    }

    await prismaConnect.userPhones.update({
      where: { id: phone_id },
      data: { phone },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: edit phone" },
    });
    return;
  }

  async deletePhone(customer_id: string, phone_id: string, ip: string) {
    const findPhoneOwner = await prismaConnect.userPhones.findUnique({
      where: { id: phone_id },
    });

    if (!findPhoneOwner) {
      throw new BadRequestError("phone not found");
    }

    if (findPhoneOwner?.UserId !== customer_id) {
      throw new UnauthorizedError("unhathorized");
    }

    await prismaConnect.userPhones.delete({ where: { id: phone_id } });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: delete phone" },
    });

    return;
  }

  async createEmail(customer_id: string, email: string, ip: string) {
    await prismaConnect.userEmails.create({
      data: { email, UserId: customer_id },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: create email" },
    });

    return;
  }

  async editEmail(
    customer_id: string,
    email_id: string,
    email: string,
    ip: string
  ) {
    const findEmailOwner = await prismaConnect.userEmails.findUnique({
      where: { id: email_id },
    });

    if (!findEmailOwner) {
      throw new BadRequestError("email not found");
    }

    if (findEmailOwner?.UserId !== customer_id) {
      throw new UnauthorizedError("unhathorized");
    }

    await prismaConnect.userEmails.update({
      where: { id: email_id },
      data: { email },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: edit email" },
    });
    return;
  }

  async deleteEmail(customer_id: string, email_id: string, ip: string) {
    const findEmailOwner = await prismaConnect.userEmails.findUnique({
      where: { id: email_id },
    });

    if (!findEmailOwner) {
      throw new BadRequestError("email not found");
    }

    if (findEmailOwner?.UserId !== customer_id) {
      throw new UnauthorizedError("unhathorized");
    }

    await prismaConnect.userEmails.delete({ where: { id: email_id } });

    await prismaConnect.userSessions.create({
      data: { UserId: customer_id, ip, type: "customer: delete email" },
    });

    return;
  }
}

export default new CustomerService();
