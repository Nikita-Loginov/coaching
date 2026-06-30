import classNames from "classnames";

import scss from "./Quote.module.scss";

interface QuoteProps {
  quote: string;
  bottomText?: string;
}

export const Quote = ({ quote, bottomText }: QuoteProps) => {
  if (!quote) return null;

  return (
    <div className={scss["quote"]}>
      <p className="p1 font-text-italic font-text-second primary-color-100">{quote}</p>

      {bottomText && (
        <p className={classNames("p4", scss["quote__bottom"])}>
          - {bottomText}
        </p>
      )}
    </div>
  );
};
