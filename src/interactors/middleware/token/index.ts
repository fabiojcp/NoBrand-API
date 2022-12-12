import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { BadRequestError, UnauthorizedError } from "../../../utils/error";

class TokenMiddleware {
  async customer(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
      throw new BadRequestError(
        "to access this route you need to send a token"
      );
    }

    token = token.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new UnauthorizedError("Invalid Token");
        }
        req.user = {
          id: decoded.sub,
          isAdm: decoded.isAdm,
          email: decoded.email,
        };
        next();
      }
    );
  }

  async manager(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
      throw new BadRequestError(
        "to access this route you need to send a token"
      );
    }

    token = token.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new UnauthorizedError("Invalid Token");
        }
        req.user = {
          id: decoded.sub,
          isAdm: decoded.isAdm,
          email: decoded.email,
        };
        next();
      }
    );
  }
}

export default new TokenMiddleware();
