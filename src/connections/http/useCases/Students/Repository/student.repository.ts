import { StudentEdited } from "@/connections/http/schemas/group.schema"
import prisma from "@/connections/http/services/prismaClient.service"

export const CreateStudent = async (groupname: string, name: string, email: string, routerip: string, studentid: string) => {
    let code = (Math.random() + 1).toString(36).substring(7);

    return prisma.student.create({
        data: {
            group: {
                connect: {
                    name: groupname
                }
            },
            name,
            email,
            code,
            routerip,
            studentid
        },
    })
}

export const EditStudent = async (editedInputs: StudentEdited[], email: string) => {
    const data = {}
    editedInputs.map((input) => {
        data[input.key] = input.value
    })
    return prisma.student.update({
        where: {
            email
        },
        data
    })
}

export const DeleteStudent = async (email: string) => {
    return prisma.student.delete({
        where: {
            email
        }
    })
}