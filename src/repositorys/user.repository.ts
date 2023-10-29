import prisma from "../services/prismaClient";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const validateAccount = async (account: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: account },
                    { email: account }
                ]
            },
        });
    
        if(!user) return reject({ status: 400, message: "Conta não encontrada!" });

        const isValidPassword = await bycrpt.compare(password, user.password);

        let finaluser = {
            ...user,
            password: undefined
        }

        const token = jwt.sign({ ...finaluser }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

        return isValidPassword ? resolve({ user:{ ...finaluser }, token }) : reject({ status: 400, message: "Palavra-passe inválida" });
    })
}

export const createUser = async (email: string, username: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            },
        });
        if(user) return reject({ status: 400, message: "Conta já existente!" });
    
        const hashedPassword = await bycrpt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
    
        const token = jwt.sign({ ...newUser, password: undefined }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });
        return resolve({ user: {...newUser, password: undefined, id: undefined}, token });
    })
}