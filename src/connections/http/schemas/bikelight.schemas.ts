import * as yup from "yup";

export const BikeLightWebhook = yup.object({
    stars: yup.string().required(),
    text: yup.string().required(),
});