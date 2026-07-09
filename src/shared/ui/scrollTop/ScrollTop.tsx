"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const ScrollTop = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.location.hash) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname, searchParams]);

  return null;
};
