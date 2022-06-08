import { prismaClient } from "../database/prismaClient.js";
import bcryptjs from "bcryptjs";

export class UsersController {
  async createUser(req, res) {
    try {
      //recebo o email e password do body
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          message: ["Por favor, informe seu email e senha!"],
        });
      }
      //estou fazendo uma consulta na tabela user, verificando se já existe user com o email que recebi do body.
      let user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });
      //se existir retorno um erro
      if (user) {
        return res.json({ message: "Usuário já cadastrado" });
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
      return res
        .status(201)
        .json({ message: `Usuário cadastrado com sucesso!`, user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
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
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllUsers(req, res) {
    try {
      //faço uma consulta no banco que vai me retornar todos os users.
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          email: true,
          permission: true,
          created_at: true,
          update_at: true,
        },
      });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      //caso o user esqueça o email ou senha
      if (!email || !password) {
        return res.status(401).json({
          message: ["Por favor, informe seu email e senha!"],
        });
      }
      //consulta o banco pelo o id e verifica se o user existe antes de fazer o update;
      let user = prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
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
      return res
        .status(200)
        .json({ message: `Usuário atualizado com sucesso!`, user });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Email deste usuário está invalido!` });
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
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      await prismaClient.user.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
