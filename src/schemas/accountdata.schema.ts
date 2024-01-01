import * as yup from 'yup';

export const AccountSchema = yup.object({
    email: yup.string().required(),
    username: yup.string().required(),
});