import classNames from "classnames";

import scss from "./ListDots.module.scss";

interface ListsDotsProps {
  direction?: "row" | "column";
  theme?: "primary" | "secondary" | 'primary-two';
  items: React.ReactNode[];
  className?: string;
}

export const ListsDots = ({
  items,
  direction = "row",
  theme = "primary",
  className
}: ListsDotsProps) => {
  const listDotsClassName = classNames(
    scss["list-dots"],
    scss[`list-dots--theme-${theme}`],
    scss[`list-dots--direction-${direction}`],
    className
  );

  if (direction === "column")
    return (
      <ul className={listDotsClassName}>
        {items.map((item, index) => {
          return (
            <li className={scss["list-dots__link"]} key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    );

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
