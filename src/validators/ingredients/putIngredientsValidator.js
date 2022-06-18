import * as yup from "yup";

export const putIngredientsValidator = yup.object({
  name: yup.string().required()
});