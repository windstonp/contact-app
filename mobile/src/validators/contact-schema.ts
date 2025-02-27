import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),

  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),

  phone: yup
    .string()
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O telefone deve estar no formato (99) 99999-9999"
    )
    .required("Telefone é obrigatório"),
});
