import * as yup from 'yup';

export const CreateGroupSchema = yup.object({
    name: yup.string().required(),
});