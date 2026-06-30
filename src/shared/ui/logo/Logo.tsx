import Link from "next/link";

import { PERSON_CONFIG } from "@/shared/config/person/person.config";

import scss from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link
      href={"/"}
      title={`${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`}
      aria-label="Перейти на главную"
      className={scss["logo"]}
    >
      <p className="p2">
        {PERSON_CONFIG.name} {PERSON_CONFIG.middlename}
      </p>
    </Link>
  );
};
