import type { LoggedUser } from '@/connections/http/schemas/account.schema';
import type {
	AddDomainActivity,
	CreateActivitySchema,
} from '@/connections/http/schemas/activity.schema';
import prisma from '@/connections/http/services/prismaClient.service';
import type { Priority } from '@prisma/client';
import type { InferType } from 'yup';

export const createActivity = async (
	data: InferType<typeof CreateActivitySchema>,
	creator: InferType<typeof LoggedUser>,
) => {
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
				connect: data.groups.map(group => {
					return {
						name: group,
					};
				}),
			},
			code: code,
		},
	});
};

export const getActivities = async () =>
	await prisma.activity.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			code: true,
			startDate: true,
			createdAt: true,
			activityDomains: {
				select: {
					domain: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			},
			logs: {
				select: {
					user: true,
					action: true,
					info: true,
					priority: true,
					createdAt: true,
				},
			},
			endDate: true,
			redirectUrl: true,
			creator: {
				select: {
					username: true,
					email: true,
				},
			},
		},
	});

export const getActivity = async (id: number) => {
	return prisma.activity.findUnique({
		where: {
			id: id,
		},
		include: {
			activityDomains: {
				select: {
					domain: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			},
		},
	});
};

export const DeleteActivity = async (id: number) => {
	return prisma.activity.delete({
		where: {
			id: id,
		},
	});
};

export const AddDomainToActivity = async (data: InferType<typeof AddDomainActivity>) => {
	const new_domain = await prisma.domain.create({
		data: {
			name: data.name,
		},
	});

	return prisma.activity.update({
		where: {
			id: data.activity_id,
		},
		data: {
			activityDomains: {
				create: {
					domainId: new_domain.id,
				},
			},
		},
	});
};

export const EditDomainFromActivity = async (domain_id: number, name: string) => {
	return prisma.domain.update({
		where: {
			id: domain_id,
		},
		data: {
			name: name,
		},
	});
};

export const DeleteDomainFromActivity = async (domain_id: number) => {
	await prisma.activityDomain.deleteMany({
		where: {
			domainId: domain_id,
		},
	});

	return prisma.domain.delete({
		where: {
			id: domain_id,
		},
	});
};

export const getActivityByCode = async (code: string) => {
	return prisma.activity.findUnique({
		where: {
			code,
		},
		select: {
			id: true,
			groups: true,
			code: true,
			title: true,
			description: true,
			createdAt: true,
			startDate: true,
			redirectUrl: true,
			endDate: true,
			blockedUsers: true,

			logs: {
				select: {
					user: true,
					action: true,
					info: true,
					priority: true,
					createdAt: true,
				},
			},
		},
	});
};

export const blockUser = async (activity_id: number, user_id: number) => {
	return prisma.activity.update({
		where: {
			id: activity_id,
		},
		data: {
			blockedUsers: {
				connect: {
					id: user_id,
				},
			},
		},
	});
}

export const CreateLog = async (activity_id: number, user_id: number, action: string, info: string, priority: Priority) => {
	return prisma.activity.update({
		where: {
			id: activity_id,
		},
		data: {
			logs: {
				create: {
					action,
					info,
					priority,
					userId: user_id,
				},
			},
		},
	});
}