import { describe } from "node:test";
import { Create, Login } from '../Controller/account.controller';
import { Request, Response } from "express";
import bycrpt from 'bcryptjs';

describe('Creating Account', async () => {

    test('Should return a JSON object with status 200 and user data', async () => {
        const req = {
            body: {
                email: 'admin@gmail.com',
                username: 'admin',
                password: 'admin',
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
    
    test("Should Login with the created account", async () => {
        const req = {
            body: {
                user: 'admin@gmail.com',
                password: 'admin',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await Login(req as Request, res as unknown as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            message: "Login Success",
            data: {
                user: {
                    email: 'admin@gmail.com',
                    username: 'admin',
                    avatar: expect.any(String),
                },
                token: expect.any(String),
            },
        })
    });
});