import prisma from "../services/prismaClient";
import bycrpt from "bcryptjs";

export const validateAccount = async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
    
        if(!user) return reject({ status: 400, message: "Invalid account" });
    
        const isValidPassword = await bycrpt.compare(password, user.password);
    
        return isValidPassword ? resolve({...user, password: undefined}) : reject({ status: 400, message: "Invalid password" });
    })

}