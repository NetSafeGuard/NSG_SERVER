import * as yup from "yup";

export const LoggedUser = yup.object({
    email: yup.string().required(),
    username: yup.string().required(),
    role: yup.string().required(),
    avatar: yup.string().required(),
    activated: yup.boolean().required(),
});

export const LoginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
});

export const AccountSchema = yup.object({
    email: yup.string().required(),
    username: yup.string().required(),
});

export const AccountEdit = yup.object({
    old_email: yup.string().required(),
    email: yup.string().required(),
    username: yup.string().required(),
    avatar: yup.string().required(),
    role: yup.string().required(),
});

export const AccountActive = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
});

export const AccountRecover = yup.object({
    email: yup.string().required(),
});  