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
