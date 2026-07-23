import { Button, Input } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";

import { useModalStore } from "@/shared/store/modal/modal.store";

import { ContactMessageInput, contactMessageSchema } from "../../model/schema";
import { sendEmail } from "../../api/send-email";

import scss from "./ContactForm.module.scss";

const defaultValues: ContactMessageInput = {
  name: "",
  email: "",
  message: "",
};

export const ContactForm = () => {
  const [isPending, setIsPending] = useState(false);

  const {close} = useModalStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: ContactMessageInput) => {
    setIsPending(true);

    try {
      const result = await sendEmail(data);

      if (result.success) {
        toast.success("Заявка успешно отправлена");
        reset(defaultValues);
      } else {
        toast.error(result.error || "Ошибка отправки заявки");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Произошла ошибка при отправке");
    } finally {
      setIsPending(false);
      close()
    }
  };

  return (
    <form className={scss["contact-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["contact-form__top"]}>
        <p className="p1">Связаться</p>

        <p className="p3">
          Оставьте свои контакты, и мы свяжемся с вами в течение 24 часов.
        </p>
      </div>

      <div className={scss["contact-form__inputs"]}>
        <Input
          {...register("name")}
          autoComplete="name"
          error={errors.name?.message}
          placeholder="Имя"
          label="Имя*"
          disabled={isPending}
        />

        <Input
          {...register("email")}
          autoComplete="email"
          error={errors.email?.message}
          placeholder="E-mail"
          label="E-mail*"
          disabled={isPending}
        />

        <Input
          {...register("message")}
          error={errors.message?.message}
          as="textarea"
          placeholder="Сообщение"
          label="Сообщение*"
          disabled={isPending}
        />
      </div>

      <div className={scss["contact-form__footer"]}>
        <div className={scss["contact-form__btns"]}>
          <Button
            typeBtn="submit"
            disabled={isPending}
            tooltip={isPending ? "Отправляем заявку..." : "Отправить заявку"}
            size="medium"
          >
            <p className="p2">
              {isPending ? "Отправляем заявку..." : "Отправить заявку"}
            </p>
          </Button>
        </div>
      </div>
    </form>
  );
};
