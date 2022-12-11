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
    
    if (!compareSync(findCustomer.password, password)) {
      throw new UnauthorizedError("Invalid credentials");
    }

    await prismaConnect.userSessions.create({data: {UserId : findCustomer.id, ip, type: "login"}});

    const token = jwt.sign(
      {
        isAdm: findCustomer.isAdm,
        id: findCustomer.id,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "72h", subject: findCustomer.id }
    );

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
      throw new UnauthorizedError("Invalid credentials");
    }

    if (!compareSync(findManager.password, password)) {
      throw new UnauthorizedError("Invalid credentials");
    }

    await prismaConnect.userSessions.create({data: {UserId : findManager.id, ip, type : "login"}});

    const token = jwt.sign(
      {
        isAdm: findManager.isAdm,
        id: findManager.id,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "72h", subject: findManager.id }
    );


    return token;
  }
}

export default new AuthService();
