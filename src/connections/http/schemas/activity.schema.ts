import * as yup from "yup";

export const CreateActivitySchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    groups: yup.array().of(yup.string()).required(),
    redirectUrl: yup.string().required()
});