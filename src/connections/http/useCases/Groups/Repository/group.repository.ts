import prisma from "@/connections/http/services/prismaClient.service";

export const createGroup = async (name: string) => {
    await prisma.group.create({
        data: {
            name,
            code: "1",
        }
    })
};