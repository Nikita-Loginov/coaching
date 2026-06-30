import classNames from "classnames";

import { Quote } from "../quote/Quote";

import scss from "./AboutInfo.module.scss";

interface AboutInfoProps {
  title: string;
  desc: string[];
  quote?: string;
  name?: string;
  post?: string;
  philosophy?: string;
}

export const AboutInfo = ({
  title,
  desc,
  quote,
  name,
  post,
  philosophy,
}: AboutInfoProps) => {
  return (
    <div className={scss["about-info"]}>
      <div className={scss["about-info__block"]}>
        <p className="p4 uppercase-text primary-color-100">Обо мне</p>

        <h2 className="h2 font-text-second">{title}</h2>
      </div>

      {philosophy && (
        <p className="p2 gray-color-300 bold-font">{philosophy}</p>
      )}

      {desc.length > 0 ? (
        <div className={classNames("textbox", scss['about-info__textbox'])}>
          {desc.map((desc_text, index) => {
            return <p key={index} className="p3">{desc_text}</p>;
          })}
        </div>
      ) : null}

      {quote && <Quote quote={quote} bottomText={`${name}, ${post}`}/>}
    </div>
  );
};
