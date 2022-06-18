import * as yup from "yup";

export const putUserValidator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
});
