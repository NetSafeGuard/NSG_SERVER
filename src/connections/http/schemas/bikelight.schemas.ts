import * as yup from "yup";

export const BikeLightWebhook = yup.object({
    name: yup.string().required(),
    stars: yup.string().required(),
    text: yup.string().required(),
});