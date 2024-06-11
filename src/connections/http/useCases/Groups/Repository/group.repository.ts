import prisma from "@/connections/http/services/prismaClient.service";

export const createGroup = async (name: string) => {
    const code = (Math.random() + 1).toString(36).substring(7);
    
    await prisma.group.create({
        data: {
            name,
            code,
        }
    })
};

export const getGroups = async () => await prisma.group.findMany({
    include: {
      students: true
    }
})

export const deleteGroups = async (name: string) => await prisma.group.delete({
    where: {
        name
    },
    include: {
        students: true
    }
})

export const editGroups = async (name: string, newName: string) => await prisma.group.update({
    where: {
        name
    },
    data: {
        name: newName
    }
})