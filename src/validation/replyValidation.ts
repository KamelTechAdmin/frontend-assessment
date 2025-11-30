import * as yup from "yup";

export const replySchema = yup
  .object({
    reply: yup
      .array()
      .of(
        yup.object({
          children: yup
            .array()
            .of(
              yup.object({
                text: yup.string(),
              })
            )
            .required(),
        })
      )
      .test("not-empty", "الرد مطلوب", (value) => {
        if (!value || value.length === 0) return false;
        const text = value?.[0]?.children?.[0]?.text ?? "";
        return text.trim().length > 0;
      }),

    ccList: yup.array().of(yup.string().email("البريد غير صالح")).optional(),
  })
  .required();
