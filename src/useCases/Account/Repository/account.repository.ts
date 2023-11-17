import prisma from "../../../services/prismaClient";
import bycrpt from "bcryptjs";

export const getAccount = async (account: string) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: account },
                { email: account }
            ]
        },
    });

    return user
}

export const getUserByEmailOrUsername = async (email: string, username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        },
    });

    return user
}

export const createUser = async (email: string, username: string, password: string) => {
    const hashedPassword = await bycrpt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: ""
        }
    });

    return newUser;
}