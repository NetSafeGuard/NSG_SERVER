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
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

        return isValidPassword ? resolve({ user:{...user, password: undefined}, token }) : reject({ status: 400, message: "Palavra-passe inválida" });
    })

}