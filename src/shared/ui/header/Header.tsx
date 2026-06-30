"use client"

import { useRef } from "react";
import classNames from "classnames";

import { Container } from "../container/Container";

import { useElementSize } from "@/shared/hooks";

import scss from "./Header.module.scss";

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  useElementSize({ ref: headerRef, varName: "header-height" });

  return (
    <header
      className={classNames(scss.header)}
      ref={headerRef}
    >
      <Container>
        <div className={scss['header__inner']}>
          
        </div>
      </Container>
    </header>
  );
};
