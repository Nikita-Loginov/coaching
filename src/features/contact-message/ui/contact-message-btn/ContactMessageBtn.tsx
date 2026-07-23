import { useModalStore } from "@/shared/store/modal/modal.store";
import { Button } from "@/shared/ui";

import type { ButtonProps } from "@/shared/ui";

export const ContactMessageBtn = ({ children, ...props }: ButtonProps) => {
  const { open } = useModalStore();

  return (
    <Button
      {...props}
      onClick={() => {
        open("contact", {});
      }}
    >
      {children}
    </Button>
  );
};
