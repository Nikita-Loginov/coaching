import Link from "next/link";

import { MENU_ITEMS } from "./config/menu-items.config";

import scss from "./Menu.module.scss";

export const Menu = () => {
  return (
    <div className={scss["menu"]}>
      <div className={scss["menu__conetnt"]}>
        <nav className={scss["menu__nav"]}>
          <ul className={scss["menu__list"]}>
            {MENU_ITEMS.map((menu_item) => {
              const { label, to } = menu_item;

              return (
                <li key={label} className={scss["menu__link"]}>
                  <Link
                    href={to}
                    title={label}
                    aria-label={`Перейти к блоку ${label.toLocaleLowerCase()}`}
                    className={"link"}
                  >
                    <p className="p3">{label}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
