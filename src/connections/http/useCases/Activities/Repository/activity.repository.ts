import { LoggedUser } from "@/connections/http/schemas/account.schema";
import { CreateActivitySchema } from "@/connections/http/schemas/activity.schema";
import prisma from "@/connections/http/services/prismaClient.service";
import { InferType } from "yup";

export const createActivity = async (data: InferType<typeof CreateActivitySchema>, creator: InferType<typeof LoggedUser>) => {
    let code = (Math.random() + 1).toString(36).substring(7);

    return prisma.activity.create({
        data: {
            title: data.title,
            description: data.description,
            startDate: data.startdate,
            redirectUrl: data.redirectUrl,
            endDate: data.enddate,
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
