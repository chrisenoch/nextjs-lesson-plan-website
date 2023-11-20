"use client";

import { useEffect, useState } from "react";

export default function useIntersectionObserver(
  rootMargin: string = "0px 0px -90% 0px",
  targetElementIdentifier: string
) {
  const [isInterSecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    let options = {
      rootMargin: rootMargin,
      threshold: 0,
    };
    let callback = (entries: IntersectionObserverEntry[]) => {
      console.log("Intersection callback invoked");
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("intersecting");
          setIsIntersecting(true);
        } else {
          console.log("not intersecting");
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

  return isInterSecting;
}

//initIntersect("0px 0px -90% 0px");
