import classNames from "classnames";

import scss from "./CardIcon.module.scss";

interface CardIconProps {
  icon: React.ReactNode;
  title: string;
  desc: string[];
}

export const CardIcon = ({ icon, title, desc }: CardIconProps) => {
  if (!icon) return;

  return (
    <div className={scss["card-icon"]}>
      <div className={scss["card-icon__icon"]}>
        <div className="icon">{icon}</div>
      </div>

      {title || desc ? (
        <div className={scss['card-icon__block']}>
          {title && <p className="p1 font-text-second">{title}</p>}

          {desc ? (
            <div className={classNames("textbox", scss['card-icon__textbox'])}>
              {desc.map((text, index) => (
                <p key={index} className="p2">
                  {text}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
