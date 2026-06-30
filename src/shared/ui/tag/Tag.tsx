import classNames from "classnames";

import scss from "./Tag.module.scss";

interface TagProps {
  children: React.ReactNode;
  theme?: "primary" | "secondary";
  className?: string;
}

export const Tag = ({ theme = "primary", children, className }: TagProps) => {
  const tagClassName = classNames(
    scss["tag"],
    scss[`tag--theme-${theme}`],
    className
  );

  return <div className={tagClassName}>{children}</div>;
};
