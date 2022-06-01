import { prismaClient } from "../database/prismaClient.js";
import bcryptjs from "bcryptjs";

export class UsersController {
  async createUser(req, res) {
    try {
      //recebo o email e password do body
      const { email, password } = req.body;
      //estou fazendo uma consulta na tabela user, verificando se já existe user com o email que recebi do body.
      let user = prismaClient.user.findUnique({
        where: {
          email,
        },
      });
      //se existir retorno um erro
      if (user) {
        return res.json({ error: "Usuário já Cadastrado!" });
      }
      //então, crio o user no banco com o prismaClient
      user = await prismaClient.user.create({
        data: {
          email,
          //aqui está sendo feito o hash da senha do user
          //onde passo no bcryptjs o password que recebi do body, e o segundo parametro é o salt(uma string aleatória)
          password_hash: await bcryptjs.hash(password, 8),
        },
      });
      return res.json(user);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findUser(req, res) {
    try {
      const { id } = req.params;
      //faço a consulta no banco com o id do user, que estou recebendo nos parametros
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      //caso não exista nenhum user com o respectivo ID, retorno um erro.
      if (!user) {
        return res.json({ error: "Esse usuário não existe!" });
      }

      return res.json(user);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findAllUsers(req, res) {
    try {
      //faço uma consulta no banco que vai me retornar todos os users.
      const users = await prismaClient.user.findMany();
      //caso não exista nenhum user cadastrado, retorno um erro.
      if (!users) {
        return res.json({ error: "Nenhum usuário cadastrado!" });
      }
      return res.json(users);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      //consulta o banco pelo o id e verifica se o user existe antes de fazer o update;
      let user = prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.json({ error: "Esse usuário não existe!" });
      }
      //update no banco pelo o id, enviando o data com o email e o password com hash
      user = await prismaClient.user.update({
        where: {
          id: Number(id),
        },
        data: {
          email,
          password_hash: await bcryptjs.hash(password, 8),
        },
      });
      return res.json(user);
    } catch (err) {
      return res.json({ message: `Email deste usuário está invalido!` });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.json({ error: "Esse usuário não existe!" });
      }

      await prismaClient.user.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Usuário deletado!" });
    } catch (err) {
      return res.json({ message: `ERRO:${err}` });
    }
  }
}
