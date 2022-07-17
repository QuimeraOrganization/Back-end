import * as yup from "yup";

export const postBrandValidator = yup.object({
  name: yup.string().required(),
});
