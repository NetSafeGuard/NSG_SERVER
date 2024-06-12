import type { Request, Response } from "express";
import {
  createUser,
  getAccount,
  getUserByEmailOrUsername,
  getUsers,
  updateUser,
  deleteUser,
  activeUser
} from "../Repository/account.repository";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RevoveryTemplate } from "@http/templates/recovery.template";
import { createToken, getAllTokens } from "../../Tokens/Repository/token.repository";
import { wss } from "@/index";

export const Login = async (req: Request, res: Response) => {
  const account = await getAccount(req.body.username);

  if (!account)
    return res.status(400).json({
      status: 400,
      message: "Conta não encontrada",
    });

  const isValidPassword = await bycrpt.compare(
    req.body.password,
    account.password
  );

  if (!isValidPassword)
    return res.status(400).json({
      status: 400,
      message: "Palavra-passe inválida",
    });

  const token = jwt.sign(
    { email: account.email },
    process.env.JWT_SECRET ?? "SCR_2023",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    status: 200,
    message: "Login Success",
    data: {
      user: {
        email: account.email,
      },
      token,
    },
  });
};

export const Verify = (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Verify Success",
    data: {
      user: {
        ...req.body.user,
      },
    },
  });
};

export const Create = async (req: Request, res: Response) => {
  const account = await getUserByEmailOrUsername(
    req.body.email,
    req.body.username
  );

  if (account)
    return res.status(400).json({
      status: 400,
      message: "Conta já existente!",
    });

  const newUser = await createUser(
    req.body.email,
    req.body.username,
    req.body.password ?? "admin"
  );

  const token = jwt.sign(
    { email: newUser },
    process.env.JWT_SECRET ?? "SCR_2023",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    status: 200,
    message: "Create Success",
    data: {
      user: {
        email: newUser,
      },
      token,
    },
  });

  getUsers().then((users) => {
    wss.io.emit("users", users);
  });
};

export const Update = async (req: Request, res: Response) => {
  const account = await getUserByEmailOrUsername(req.body.old_email, "");

  if (!account)
    return res.status(400).json({
      status: 400,
      message: "Conta não existente!",
    });

  const newaccount = await getUserByEmailOrUsername(req.body.email, "");

  if (newaccount && newaccount.email !== req.body.old_email)
    return res.status(400).json({
      status: 400,
      message: "Já existe uma conta com esse email ou nome de utilizador!",
    });

  const newUser = await updateUser(
    req.body.old_email,
    req.body.email,
    req.body.username,
    req.body.avatar,
    req.body.role
  );

  res.status(200).json({
    status: 200,
    message: "Update Success",
    data: {
      user: {
        email: newUser,
      },
    },
  });

  getUsers().then((users) => {
    wss.io.emit("users", users);
  });
};

export const Delete = async (req: Request, res: Response) => {
  const account = await getUserByEmailOrUsername(
    req.body.email,
    req.body.username
  );

  if (!account)
    return res.status(400).json({
      status: 400,
      message: "Conta não existente!",
    });

  const newUser = await deleteUser(req.body.email);

  res.status(200).json({
    status: 200,
    message: "Delete Success",
    data: {
      user: {
        email: newUser,
      },
    },
  });

  getUsers().then((users) => {
    wss.io.emit("users", users);
  });
};

export const Active = async (req: Request, res: Response) => {

  if (req.body.activated)
    return res.status(400).json({
      status: 400,
      message: "Conta já ativada!",
    });

  const newUser = await activeUser(req.body.user.email, req.body.password);

  res.status(200).json({
    status: 200,
    message: "Active Success",
    data: {
      user: {
        email: newUser,
      },
    },
  });
};

export const Recover = async (req: Request, res: Response) => {
  const getAccount = await getUserByEmailOrUsername(req.body.email, "");

  if (!getAccount) return res.status(400).json({
    status: 400,
    message: "Conta não existente!",
  });

  const tokens = await getAllTokens();

  let token = generateStringCode();

  while (tokens.find((t) => t.token === token)) {
    token = generateStringCode();
  }

  await createToken(token, req.body.email);

  const email = new RevoveryTemplate(req.body.email, token);
  email.sendEmail(req.body.email);

  res.status(200).json({
    status: 200,
    message: "Email enviado com sucesso!",
  });
};

function generateStringCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let code = "";

  for (let i = 0; i < 5; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }


  return code;
}
