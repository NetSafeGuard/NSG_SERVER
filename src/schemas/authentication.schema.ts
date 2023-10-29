import * as yup from 'yup';

export const LoginSchema = yup.object({
    user: yup.string().required(),
    password: yup.string().required(),
});