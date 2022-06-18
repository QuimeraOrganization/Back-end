import jwt from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient.js";
export default async (req, res, next) => {
  //recebo athorization, que no caso seria o token gerado, recebemos dos headers
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: ["Login Required"],
    });
  }
  //divido os valores que recebo em authorization com split, no caso aqui a gente só precisa do token
  const [, token] = authorization.split(" ");

  try {
    // recebo os dados que vem no token, e verifico com o jwt se o token que veio no
    // authorization é valido!
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: ["Usuário inválido!!"],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: ["Token expirado ou inválido!"],
    });
  }
};
