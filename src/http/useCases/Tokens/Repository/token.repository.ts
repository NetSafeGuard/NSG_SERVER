import prisma from "../../../services/prismaClient.service";

export const createToken = async (token: string, email: string) => {
  await prisma.token.deleteMany({
    where: {
      email,
    },
  });

  const newToken = await prisma.token.create({
    data: {
      token,
      email,
    },
  });

  return newToken;
};

export const getToken = async (token: string) => {
  const newToken = await prisma.token.findFirst({
    where: {
      token,
    },
  });

  return newToken;
};

export const deleteToken = async (email: string) => {
  await prisma.token.deleteMany({
    where: {
      email,
    },
  });
};
