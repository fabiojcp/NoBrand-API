import { compareSync } from "bcryptjs";
import prismaConnect from "../../utils/dataBaseClient";
import { UnauthorizedError } from "../../utils/error";
import jwt from "jsonwebtoken";

class AuthService {
  async customer(email: string, password: string, ip: string) {
    const findCustomer = await prismaConnect.users.findUnique({
      where: { email },
    });

    if (!findCustomer) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (!compareSync(password, findCustomer.password)) {
      await prismaConnect.userSessions.create({
        data: {
          UserId: findCustomer!.id,
          ip,
          type: "login customer: wrong password",
        },
      });
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        isAdm: false,
        id: findCustomer.id,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "72h", subject: findCustomer.id }
    );

    await prismaConnect.userSessions.create({
      data: { UserId: findCustomer.id, ip, type: "login customer: sucess" },
    });

    return token;
  }

  async manager(email: string, password: string, ip: string) {
    const findManager = await prismaConnect.users.findUnique({
      where: { email },
    });

    if (!findManager) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (!findManager.isAdm) {
      await prismaConnect.userSessions.create({
        data: {
          UserId: findManager!.id,
          ip,
          type: "login customer: try manager login",
        },
      });
      throw new UnauthorizedError("Invalid credentials");
    }

    if (!compareSync(password, findManager.password)) {
      await prismaConnect.userSessions.create({
        data: {
          UserId: findManager!.id,
          ip,
          type: "login manager: wrong password",
        },
      });
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        isAdm: true,
        id: findManager.id,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "72h", subject: findManager.id }
    );

    await prismaConnect.userSessions.create({
      data: { UserId: findManager.id, ip, type: "login" },
    });
    return token;
  }
}

export default new AuthService();
