import prisma from "../services/prismaClient";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const validateAccount = async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
    
        if(!user) return reject({ status: 400, message: "Invalid account" });
    
        const isValidPassword = await bycrpt.compare(password, user.password);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

        return isValidPassword ? resolve({user:{...user, password: undefined},token}) : reject({ status: 400, message: "Invalid password" });
    })

}