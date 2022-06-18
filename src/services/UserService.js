import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";
import bcryptjs from "bcryptjs";
class UserService {
  async createUser(email, password, permission) {
    if (!email || !password) {
      throw new AppException("Por favor, informe seu email e senha!", 401);
    }
    //estou fazendo uma consulta na tabela user, verificando se já existe user com o email que recebi do body.
    let user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    //se existir retorno um erro
    if (user) {
      throw new AppException("Usuário já cadastrado!", 400);
    }
    //então, crio o user no banco com o prismaClient
    user = await prismaClient.user.create({
      select: {
        id: true,
        email: true,
        permission: true,
        created_at: true,
        update_at: true,
      },
      data: {
        email,
        permission,
        //aqui está sendo feito o hash da senha do user
        //onde passo no bcryptjs o password que recebi do body, e o segundo parametro é o salt(uma string aleatória)
        password_hash: await bcryptjs.hash(password, 8),
      },
    });
    return user;
  }

  async findUser(id) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        email: true,
        permission: true,
        created_at: true,
        update_at: true,
      },
    });
    //caso não exista nenhum user com o respectivo ID, retorno um erro.
    if (!user) {
      throw new AppException("Usuário não encontrado!", 404);
    }
    return user;
  }

  async findAllUsers() {
    //faço uma consulta no banco que vai me retornar todos os users.
    const users = await prismaClient.user.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        email: true,
        permission: true,
        created_at: true,
        update_at: true,
      },
    });
    return users;
  }

  async updateUser(id, email, password, permission) {
    //caso o user esqueça o email ou senha
    if (!email || !password) {
      throw new AppException("Por favor, informe seu email e senha!", 401);
    }
    //consulta o banco pelo o id e verifica se o user existe antes de fazer o update;
    let user = prismaClient.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new AppException("Usuário não encontrado!", 404);
    }
    //update no banco pelo o id, enviando o data com o email e o password com hash
    user = await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        email: true,
        permission: true,
        created_at: true,
        update_at: true,
      },
      data: {
        email,
        permission,
        password_hash: await bcryptjs.hash(password, 8),
      },
    });
    return user;
  }

  async deleteUser(id) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      throw new AppException("Usuário não encontrado!", 404);
    }

    await prismaClient.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

const userService = new UserService();

export { userService };
