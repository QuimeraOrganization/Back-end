import * as yup from "yup";

export const putProductValidator = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  userId: yup.number().required(),
});
