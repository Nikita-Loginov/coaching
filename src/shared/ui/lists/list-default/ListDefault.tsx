import Link from "next/link";
import classNames from "classnames";

import scss from "./ListDefault.module.scss";

interface ListDefaultProps {
  items: {
    as: "link" | "default";
    to: string;
    label: string;
    ariaLabel?: string;
  }[];
  className?: string;
}

export const ListDefault = ({ items, className}: ListDefaultProps) => {
  return (
    <ul className={classNames(scss["list-default"], className)}>
      {items.map((item, index) => (
        <li key={index} className={scss["list-default__link"]}>
          <div className={scss["list-default__item"]}>
            {item.as === "link" ? (
              <Link
                href={item.to}
                aria-label={item.ariaLabel}
                title={item.label}
                className="link"
              >
                <p className="p3">{item.label}</p>
              </Link>
            ) : (
              <p className="p3 link">{item.label}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
