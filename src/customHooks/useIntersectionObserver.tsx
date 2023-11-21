"use client";

import { useEffect, useState } from "react";

export default function useIntersectionObserver(
  targetElementIdentifier: string,
  //"0px 0px -90% 0px"
  rootMargins: { mt: string; mr: string; mb: string; ml: string } = {
    mt: "0px",
    mr: "0px",
    mb: "-80%",
    ml: "0px",
  }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const rootMargin = Object.values(rootMargins).join(" ");

  useEffect(() => {
    let options = {
      rootMargin: rootMargin,
      threshold: 0,
    };
    let callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("intersecting");
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector(targetElementIdentifier);
    if (target) {
      observer.observe(target);
    } else {
      throw new Error(
        "Unable to observe because targetElement not found in DOM"
      );
    }

    return () => {
      target && observer.unobserve(target);
    };
  }, []);

  return isIntersecting;
}

//initIntersect("0px 0px -90% 0px");
