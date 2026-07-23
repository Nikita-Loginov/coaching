"use client";

import { useRef } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

import { Logo } from "../logo/Logo";
import { Menu } from "../menu/Menu";
import { Container } from "../container/Container";
import { Button } from "../button/Button/Button";
import { ContactMessageBtn } from "@/features/contact-message/ui";
import { Modal } from "../modal/Modal";
import { ContactForm } from "@/features/contact-message/ui";

import { headerVisible } from "@/shared/config/motion/variants";

import { useElementSize } from "@/shared/hooks";

import { useModalStore } from "@/shared/store/modal/modal.store";

import scss from "./Header.module.scss";


export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  const { activeModal, close } = useModalStore();

  useElementSize({ ref: headerRef, varName: "header-height" });

  return (
    <>
      <header
        className={classNames(scss.header)}
        ref={headerRef}
        // initial={headerVisible.initial}
        // animate={headerVisible.animate}
        // transition={headerVisible.transition}
      >
        <Container>
          <div className={scss["header__inner"]}>
            <Logo />

            <Menu />

            <div className={scss["header__btns"]}>
              <ContactMessageBtn theme="secondary" size="small">
                <p className="p3">Связаться</p>
              </ContactMessageBtn>
            </div>
          </div>
        </Container>
      </header>

      <Modal isOpen={activeModal === "contact"} onClose={close}>
        <ContactForm />
      </Modal>
    </>
  );
};
