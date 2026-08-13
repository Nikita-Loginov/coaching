import Link from "next/link";
import classNames from "classnames";

import scss from "./ListDefault.module.scss";

interface ListDefaultProps {
  items: {
    as: "link" | "default";
    to?: string;
    label: string;
    ariaLabel?: string;
  }[];
  variant?: "default" | "step";
  className?: string;
}

export const ListDefault = ({
  items,
  className,
  variant,
}: ListDefaultProps) => {
  const isStep = variant === "step";

  return (
    <ul className={classNames(scss["list-default"], className)}>
      {items.map((item, index) => {
        return (
          <li key={index} className={scss["list-default__link"]}>
            <div className={scss["list-default__item"]}>
              {item.as === "link" && item.to ? (
                <Link
                  href={item.to}
                  aria-label={item.ariaLabel}
                  title={item.label}
                  className="link"
                >
                  <p className="p3">
                    {isStep ? `${index + 1})` : null}
                    {item.label}
                  </p>
                </Link>
              ) : (
                <p className="p3">{isStep ? `${index + 1})` : null} {item.label}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
