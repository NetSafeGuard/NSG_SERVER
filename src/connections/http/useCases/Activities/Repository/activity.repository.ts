import type { LoggedUser } from "@/connections/http/schemas/account.schema";
import type { CreateActivitySchema } from "@/connections/http/schemas/activity.schema";
import prisma from "@/connections/http/services/prismaClient.service";
import type { InferType } from "yup";

export const createActivity = async (data: InferType<typeof CreateActivitySchema>, creator: InferType<typeof LoggedUser>) => {
    const code = (Math.random() + 1).toString(36).substring(7);

    return prisma.activity.create({
        data: {
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            redirectUrl: data.redirectUrl,
            endDate: data.endDate,
            creator: {
                connect: {
                    email: creator.email,
                },
            },
            groups: {
                connect: data.groups.map((group) => {
                    return {
                        name: group,
                    };
                }),
            },
            code: code
        }
    });
};


export const getActivities = async () => await prisma.activity.findMany({
    select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        domains: true,
        endDate: true,
        redirectUrl: true,
        creator: {
            select: {
                username: true,
                email: true,
            }
        },
    }
});    

export const getActivity = async (id: number) => {
    return prisma.activity.findUnique({
        where: {
            id: id,
        },
        include: {
            domains: true
        }
    });
}

export const DeleteActivity = async (id: number) => {

    return prisma.activity.delete({
        where: {
            id: id
        }
    });
}

export const AddDomainActivity = async (data: InferType<typeof AddDomainActivity>) => {
    return prisma.activity.update({
        where: {
            id: data.activity_id
        },
        data: {
            domains: {
                create: {
                    name: data.name
                }
            }
        }
    });
}