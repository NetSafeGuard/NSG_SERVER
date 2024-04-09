import * as yup from 'yup';

export const CreateGroupSchema = yup.object({
    name: yup.string().required(),
});

export const CreateStudentSchema = yup.object({
    groupname: yup.string().required(),
    name: yup.string().required(),
    studentid: yup.string().required(),
    email: yup.string().required(),
    routerip: yup.string().required(),
});