import * as yup from "yup";

export const postIngredientsValidator = yup.object({
  name: yup.string().required()
});