import * as yup from "yup";

export const postFeedbackValidator = yup.object({
  contents: yup.string().required(),
  productId: yup.number().required(),
  userId: yup.number().required(),
});
