import * as yup from "yup";

export const CreateActivitySchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    startdate: yup.date().required(),
    enddate: yup.date().required(),
    groups: yup.array().of(yup.string()).required(),
    redirectUrl: yup.string().optional(),
});