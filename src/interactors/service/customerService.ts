import prismaConnect from "../../utils/dataBaseClient";
import { hash } from "bcryptjs";
import { ICustomerCreate, ICustomerEdit } from "../../interfaces";
import {
  BadRequestError,
  ConflitError,
  UnauthorizedError,
} from "../../utils/error";

class CustomerService {
  async create({ email, name, phone, password }: ICustomerCreate) {
    const findUserEmail = await prismaConnect.users.findUnique({
      where: { email },
    });

    if (findUserEmail) {
      throw new ConflitError("this email is already registered");
    }
    
    const hashedPassword = await hash(password.toString(), 10);


    const customer = await prismaConnect.users.create({
      data: { name, password, phone : phone.toString(), email, isAdm: false },
      include: { userEmails: true, userPhones: true },
    });

    return customer;
  }

  async customerData(customer_id: string) {
    const findUser = await prismaConnect.users.findUnique({
      where: { id: customer_id },
      include: {
        cart: true,
        userEmails: true,
        userPhones: true,
      },
    });

    return findUser;
  }

  async edit({ customer_id, email, name, phone, password }: ICustomerEdit) {
    await prismaConnect.users.update({
      where: { id: customer_id },
      data: { email, name, phone, password },
    });
    return;
  }

  async createPhone(customer_id: string, phone: string) {
    await prismaConnect.userPhones.create({
      data: { phone, UserId: customer_id },
    });
    return;
  }

  async editPhone(customer_id: string, phone_id: string, phone: string) {
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
    return;
  }
  
  async deletePhone(customer_id: string, phone_id: string) {
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
  }

  async createEmail(customer_id: string, email: string) {
    await prismaConnect.userEmails.create({
      data: { email, UserId: customer_id },
    });
    return;
  }

  async editEmail(customer_id: string, email_id: string, email: string) {
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
    return;
  }

  async deleteEmail(customer_id: string, email_id: string) {
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
  }
}

export default new CustomerService();
