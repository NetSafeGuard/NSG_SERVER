import { v4 } from 'uuid';
import prisma from '../../../services/prismaClient.service';
import bycrpt from 'bcryptjs';
import type { Role } from '@prisma/client';
import { getAllTokens } from '../../Tokens/Repository/token.repository';

export const getAccount = async (account: string) => {
	const user = await prisma.user.findFirst({
		where: {
			OR: [{ username: account }, { email: account }],
		},
	});

	return user;
};

export const getUserByEmailOrUsername = async (email: string, username: string) => {
	const user = await prisma.user.findFirst({
		where: {
			OR: [{ username }, { email }],
		},
	});

	return user;
};

export const createUser = async (email: string, username: string, password: string) => {
	const hashedPassword = await bycrpt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			email,
			username,
			password: hashedPassword,
			role: 'USER',
		},
	});

	return newUser.email;
};

export const updateUser = async (
	old_email: string,
	email: string,
	username: string,
	avatar: string,
	role: string,
) => {
	const newUser = await prisma.user.update({
		where: {
			email: old_email,
		},
		data: {
			username,
			avatar,
			email,
			role: role as Role,
		},
	});

	return newUser.email;
};

export const deleteUser = async (email: string) => {
	const user = await prisma.user.delete({
		where: {
			email,
		},
	});

	return user.email;
};

export const getUsers = async () => {
	const users = await prisma.user.findMany({
		select: {
			email: true,
			username: true,
			role: true,
			avatar: true,
			createdAt: true,
		},
	});

	return users;
};

export const activeUser = async (email: string, password: string) => {
	const hashedPassword = await bycrpt.hash(password, 10);

	const newUser = await prisma.user.update({
		where: {
			email,
		},
		data: {
			password: hashedPassword,
			activated: true,
		},
	});

	return newUser;
};

export const recoverUser = async (email: string) => {
    const tokens = await getAllTokens();

	let token = generateStringCode();

	while (tokens.find(t => t.token === token)) {
		token = generateStringCode();
	}

	const password = bycrpt.hashSync(token, 10);

	const newUser = await prisma.user.update({
		where: {
			email,
		},
		data: {
			password,
			activated: false,
		},
	});

	return token;
};

function generateStringCode() {
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	let code = '';

	for (let i = 0; i < 5; i++) {
		code += letters.charAt(Math.floor(Math.random() * letters.length));
	}

	return code;
}
