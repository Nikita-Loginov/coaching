"use client"

import { useRef } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

import { Logo } from "../logo/Logo";
import { Menu } from "../menu/Menu";
import { Container } from "../container/Container";
import { Button } from "../button/Button/Button";

import { headerVisible } from "@/shared/config/motion/variants";

import { useElementSize } from "@/shared/hooks";

import scss from "./Header.module.scss";

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  useElementSize({ ref: headerRef, varName: "header-height" });

  return (
    <header
      className={classNames(scss.header)}
      ref={headerRef}
      // initial={headerVisible.initial}
      // animate={headerVisible.animate}
      // transition={headerVisible.transition}
    >
      <Container>
        <div className={scss['header__inner']}>
          <Logo />

          <Menu />

          <div className={scss['header__btns']}>
            <Button theme="secondary" size="small">
              <p className="p3">Связаться</p>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
