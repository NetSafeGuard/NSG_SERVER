import prisma from "@/connections/http/services/prismaClient.service"

export const CreateStudent = async (groupname: string, name: string, email: string, routerip: string, studentid) => {
    return prisma.student.create({
        data: {
            group: {
                connect: {
                    name: groupname
                }
            },
            name,
            email,
            routerip,
            studentid
        },
    })
}