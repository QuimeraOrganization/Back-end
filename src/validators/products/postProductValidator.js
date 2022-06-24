import * as yup from "yup";

export const postProductValidator = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  userId: yup.number().required(),
  brandId: yup.number().required(),
});
