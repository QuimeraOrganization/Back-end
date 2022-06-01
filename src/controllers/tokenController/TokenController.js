import { prismaClient } from "../../database/prismaClient.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
export class TokenController {
  async handle(req, res) {
    const { email, password } = req.body;
    //caso não tenha recebido email ou password do body, é exibido um erro!
    if (!email || !password) {
      return res.status(401).json({
        errors: ["Credencias inválidas!"],
      });
    }
    //feito uma consulta no banco, pelo o email do user
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    //caso não exista o user é exibido um erro;
    if (!user) {
      return res.json({ error: "Esse usuário não existe!" });
    }

    //uma função para validação de senha
    //comparo se a senha que veio do body é a mesma que está salva no banco.
    const passwordIsValid = (password) => {
      return bcryptjs.compare(password, user.password_hash);
    };

    //se não for válida é retornado um erro
    if (!(await passwordIsValid(password))) {
      return res.json({ error: "Senha inválida!" });
    }

    const { id } = user;
    //verifico se os dados estão ok, se sim, ele gera o token,
    // por fim uma expiração de 1d(pode ser mudado), isso quer dizer que após um dia,
    // o usuário terá que se autenticar novamente
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}
