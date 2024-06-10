import * as yup from 'yup';

export const CreateGroupSchema = yup.object({
    name: yup.string().required(),
});

export const CreateStudentSchema = yup.object({
    groupname: yup.string().required(),
    name: yup.string().required(),
    studentid: yup.string().required(),
    email: yup.string().required(),
});

export const EditStudentSchema = yup.object({
    editedInputs: yup.array().of(yup.object({
        key: yup.string().required(),
        value: yup.string().required(),
    })),
    email: yup.string().required(),
});

export const DeleteStudentSchema = yup.object({
    email: yup.string().required(),
});

export type EditStudent = {
    editedInputs: EditStudent[],
    email: string,
};

export type StudentEdited = {
    key: string,
    value: string,
}