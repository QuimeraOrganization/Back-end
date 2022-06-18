import { userService } from "../services/UserService.js";

export class UsersController {
  async createUser(req, res) {
    //recebo o email e password do body
    const { email, password, permission } = req.body;

    //estou fazendo uma consulta na tabela user, verificando se já existe user com o email que recebi do body.
    let user = await userService.createUser(email, password, permission);

    return res
      .status(201)
      .json({ message: `Usuário cadastrado com sucesso!`, user });
  }

  async findUser(req, res) {
    const { id } = req.params;
    //faço a consulta no banco com o id do user, que estou recebendo nos parametros
    const user = await userService.findUser(id);

    return res.status(200).json(user);
  }

  async findAllUsers(req, res) {
    //faço uma consulta no banco que vai me retornar todos os users.
    const users = await userService.findAllUsers();
    return res.status(200).json(users);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { email, password, permission } = req.body;
    const user = await userService.updateUser(id, email, password, permission, authorization);
    return res
      .status(200)
      .json({ message: `Usuário atualizado com sucesso!`, user });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    await userService.deleteUser(id, authorization);
    return res.status(204).send();
  }
}
