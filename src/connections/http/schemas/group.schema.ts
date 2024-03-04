import * as yup from 'yup';

export const CreateSchema = yup.object({
    name: yup.string().required(),
});