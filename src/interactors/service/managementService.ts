import { hash } from "bcryptjs";
import { IManagerCreate } from "../../interfaces";
import prismaConnect from "../../utils/dataBaseClient";
import {
  ConflitError,
  ErrorHandler,
  UnauthorizedError,
} from "../../utils/error";

class ManagerService {
  async create({
    ip,
    email,
    name,
    phone,
    password,
    secretKey,
  }: IManagerCreate) {
    if (secretKey !== process.env.ADM_SECRET_KEY) {
      throw new ErrorHandler("missing authorization permissions", 401);
    }

    const findUserEmail = await prismaConnect.users.findUnique({
      where: { email },
    });

    if (findUserEmail) {
      throw new ConflitError("this email is already registered");
    }

    const hashedPassword = await hash(password, 10);

    const manager = await prismaConnect.users.create({
      data: { name, password: hashedPassword, phone, email, isAdm : true },
      include: { userEmails: true, userPhones: true },
    });

    await prismaConnect.userSessions.create({
      data: { UserId: manager.id, ip, type: "manager: create" },
    });

    return manager;
  }

  async readUsers(userId: string) {
    const findUser = await prismaConnect.users.findUnique({
      where: { id: userId },
    });

    if (!findUser!.isAdm) {
      throw new UnauthorizedError("unhathorized");
    }

    const findUsers = await prismaConnect.users.findMany({
      include: {
        cart: true,
        userEmails: true,
        userPhones: true,
      },
    });

    return findUsers;
  }
}

export default new ManagerService();
