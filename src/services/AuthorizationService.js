import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

class AuthorizationService {
  async login(email, password) {
    if (!email || !password) {
      throw new AppException("Credenciais Inválidas!", 401);
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppException("Usuário não encontrado!", 404);
    }

    const passwordIsValid = (password) => {
      return bcryptjs.compare(password, user.password_hash);
    };

    if (!(await passwordIsValid(password))) {
      throw new AppException("Usuário ou Senha inválidos!", 401)
    }

    const { id, permission } = user;
    const token = jwt.sign(
      { id, email, permission },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    return token;
  }
}

const authorizationService = new AuthorizationService();
export { authorizationService };