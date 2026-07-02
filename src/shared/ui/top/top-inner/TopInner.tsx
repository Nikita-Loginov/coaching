import classNames from "classnames";

import scss from "./TopInner.module.scss";

interface TopInnerProps {
  title: string;
  desc?: string[];
  children: React.ReactNode;
}

export const TopInner = ({ title, desc, children }: TopInnerProps) => {
  return (
    <div className={scss["top-inner"]}>
      <div className={scss["top-inner__block"]}>
        <h2 className="h2 font-text-second">{title}</h2>

        {(desc && desc?.length > 0) ? (
          <div className={classNames(scss["top-inner__textbox"])}>
            {desc?.map((text, index) => (
              <p key={index} className="p2">
                {text}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      {children}
    </div>
  );
};
