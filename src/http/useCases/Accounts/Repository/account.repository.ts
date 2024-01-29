import { v4 } from "uuid";
import prisma from "../../../services/prismaClient.service";
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
            role: "USER"
        }
    });

    return newUser.email;
}

export const updateUser = async (old_email: string, email: string, username: string, avatar: string) => {
    const newUser = await prisma.user.update({
        where: {
            email: old_email
        },
        data: {
            username,
            avatar,
            email
        }
    });

    return newUser.email;
}

export const deleteUser = async (email: string) => {
    const user = await prisma.user.delete({
        where: {
            email
        }
    });

    return user.email;
}

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            username: true,
            role: true,
            avatar: true,
            createdAt: true,
        }
    });

    return users
}

export const activeUser = async (email: string, password: string) => {
    const hashedPassword = await bycrpt.hash(password, 10);

    const newUser = await prisma.user.update({
        where: {
            email
        },
        data: {
            password: hashedPassword,
            activated: true
        }
    });

    return newUser;
}

export const recoverUser = async (email: string) => {

    const newpass = v4();

    const password = bycrpt.hashSync(newpass, 10);

    const newUser = await prisma.user.update({
        where: {
            email
        },
        data: {
            password,
            activated: false
        }
    });

    return newpass;
}
