import * as yup from "yup";

export const CreateActivitySchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    groups: yup.array().of(yup.string()).required(),
    redirectUrl: yup.string().required()
});

export const AddDomainActivity = yup.object().shape({
    activity_id: yup.number().required(),
    name: yup.string().required()
});

export const EditDomainActivity = yup.object().shape({
    domain_id: yup.string().required(),
    name: yup.string().required()
});

export const DeleteActivity = yup.object().shape({
    id: yup.number().required()
});

export const DeleteDomainActivity = yup.object().shape({
    domain_id: yup.number().required()
});