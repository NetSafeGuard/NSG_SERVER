import { describe } from "node:test";
import { Create } from '../controllers/authentication.controller';
import { Request, Response } from "express";
import bycrpt from 'bcryptjs';

describe('Teste da função Create', async () => {
    test('Deve retornar um objeto JSON com status 200 e os dados do usuário', async () => {
        const req = {
            body: {
                user: {
                    email: 'admin@gmail.com',
                    username: 'admin',
                    password: bycrpt.hashSync('admin', 8),
                },
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        await Create(req as Request, res as unknown as Response);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            message: "Create Success",
            data: {
                user: {
                    email: 'admin@gmail.com',
                    username: 'admin',
                    avatar: expect.any(String),
                },
                token: expect.any(String),
            },
        });
    });
});