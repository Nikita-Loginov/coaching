"use client";

import classNames from "classnames";
import { useRef, useState } from "react";
import { Swiper as SwiperJs, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Mousewheel, A11y, Pagination, Navigation } from "swiper/modules";

import "swiper/css";

import scss from "./Swiper.module.scss";

interface SwiperProps {
  config: SwiperOptions;
  items: React.ReactElement[];
  pagination?: boolean;
  arrows?: boolean;
}

export const Swiper = ({ config, items, pagination, arrows }: SwiperProps) => {
  const [isInit, setIsInit] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!items.length) return null;

  const modules = [Mousewheel, A11y];

  if (pagination) {
    modules.push(Pagination);
  }

  if (arrows) {
    modules.push(Navigation);
  }

  const onBeforeInit = (swiper: any) => {
    if (arrows && typeof swiper.params.navigation !== "boolean") {
      swiper.params.navigation = {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      };
    }
  };

  const paginationProps = pagination
    ? {
        pagination: {
          type: "fraction" as const,
          renderFraction: (currentClass: string, totalClass: string) => {
            return `
            <span class="${currentClass}"></span>
            <span class="separator"> / </span>
            <span class="${totalClass}"></span>
          `;
          },
        },
      }
    : {};

  const arrowsProps = arrows
    ? {
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
      }
    : {};

    'f'

  return (
    <div className={classNames(scss["swiper"], isInit && scss["swiper--init"])}>
      <SwiperJs
        {...config}
        modules={modules}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          sensitivity: 1,
          eventsTarget: "container",
        }}
        {...arrowsProps}
        {...paginationProps}
        onInit={() => setIsInit(true)}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className={scss["swiper__slide"]}>
            {slide}
          </SwiperSlide>
        ))}
      </SwiperJs>

      {/* {arrows && (
        <div className={scss["swiper__arrows"]}>
          <Button
            ref={prevRef}
            variant="icon"
            iconLeft={<Icons.ArrowLeftIcon />}
            className={classNames(scss["swiper__arrow"], scss["prev"])}
          ></Button>

          <Button
            ref={nextRef}
            variant="icon"
            iconLeft={<Icons.ArrowRightIcon />}
            className={classNames(scss["swiper__arrow"], scss["next"])}
          >
            next
          </Button>
        </div>
      )} */}
    </div>
  );
};
