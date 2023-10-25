import prisma from "../services/prismaClient";

export const checkUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user ?? false;
}