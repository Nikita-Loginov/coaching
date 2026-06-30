import classNames from "classnames";

import scss from "./ListDots.module.scss";

interface ListsDotsProps {
  direction?: "row" | "column";
  theme?: "primary" | "secondary";
  items: React.ReactNode[];
}

export const ListsDots = ({
  items,
  direction = "row",
  theme = "primary",
}: ListsDotsProps) => {
  const listDotsClassName = classNames(
    scss["list-dots"],
    scss[`list-dots--theme-${theme}`]
  );

  if (direction === "column") return <p>//todo</p>;

  return (
    <ul className={listDotsClassName}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li className={scss["list-dots__link"]} key={index}>
            {item}
            {!isLast && "·"}
          </li>
        );
      })}
    </ul>
  );
};
