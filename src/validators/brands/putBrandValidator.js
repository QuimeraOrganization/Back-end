import * as yup from "yup";

export const putBrandValidator = yup.object({
  name: yup.string().required(),
  productId: yup.number().required(),
});
