import type { StudentEdited } from "@/connections/http/schemas/group.schema"
import prisma from "@/connections/http/services/prismaClient.service"

export const CreateStudent = async (groupname: string, name: string, email: string, studentid: string) => {
    const code = (Math.random() + 1).toString(36).substring(7);

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

export const getStudentByCode = async (code: string) => {
    return prisma.student.findUnique({
        where: {
            code
        },
        select: {
            id: true,
            group: true,
            code: true,
            name: true,
            studentid: true,
            email: true
        }
    })
}