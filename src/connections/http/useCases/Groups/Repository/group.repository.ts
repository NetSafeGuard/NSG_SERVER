import prisma from "@/connections/http/services/prismaClient.service";

export const createGroup = async (name: string) => {
    let code = (Math.random() + 1).toString(36).substring(7);
    
    await prisma.group.create({
        data: {
            name,
            code,
        }
    })
};

export const getGroups = async () => await prisma.group.findMany()
