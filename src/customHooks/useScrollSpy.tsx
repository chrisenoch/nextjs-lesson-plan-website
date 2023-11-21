"use client";

import { useEffect, useState } from "react";

export default function useIntersectionObserver(
  targetElementIdentifiers: string[],
  rootMargins: { mt: string; mr: string; mb: string; ml: string } = {
    mt: "0px",
    mr: "0px",
    mb: "-80%",
    ml: "0px",
  }
) {
  const [intersectingStatus, setIntersectingStatus] = useState<Map<
    string, //id
    {
      target: any;
      isIntersecting: boolean;
    }
  > | null>(null);

  const rootMargin = Object.values(rootMargins).join(" ");

  useEffect(() => {
    let options = {
      rootMargin: rootMargin,
      threshold: 0,
    };

    const targetDetailsMap = new Map();
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      console.log("Intersection callback invoked");
      const activeIntersectors: {
        id: string;
        target: any;
        isIntersecting: boolean;
      }[] = [];
      const inactiveIntersectors: {
        id: string;
        target: any;
        isIntersecting: boolean;
      }[] = [];
      entries.forEach((entry) => {
        console.log("debug here");
        const targetDetailsInfo = targetDetailsMap.get(entry.target);
        if (entry.isIntersecting) {
          console.log("intersecting");
          targetDetailsInfo.isIntersecting = true;
          activeIntersectors.push(targetDetailsInfo);
        } else {
          targetDetailsInfo.isIntersecting = false;
          inactiveIntersectors.push(targetDetailsInfo);
        }
      });

      if (activeIntersectors.length > 1) {
        const activeIntersector = activeIntersectors.pop(); //temporarily remove so we don't make it inactive
        //make the others false
        activeIntersectors.forEach((intersector) => {
          intersector.isIntersecting = false;
        });
        activeIntersectors.push(activeIntersector!);
      }

      //set the final state
      const allInterceptors = [...activeIntersectors, ...inactiveIntersectors];
      let allInterceptorsMap = new Map();
      allInterceptors.forEach((interceptor) => {
        allInterceptorsMap.set(interceptor.id, {
          target: interceptor.target,
          isIntersecting: interceptor.isIntersecting,
        });
      });
      setIntersectingStatus(allInterceptorsMap);
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const targetDetails = targetElementIdentifiers.map((identifier) => {
      return {
        id: identifier,
        target: document.querySelector(identifier),
        isInterSecting: false,
      };
    });

    //observe targets and add them to the map
    targetDetails.forEach((tDetails) => {
      if (tDetails.target) {
        targetDetailsMap.set(tDetails.target, tDetails);
        observer.observe(tDetails.target);
      } else {
        throw new Error(
          "Unable to observe because targetElement not found in DOM"
        );
      }
    });

    return () => {
      targetDetails.forEach((tDetails) => {
        if (tDetails.target) {
          observer.unobserve(tDetails.target);
        }
      });
    };
  }, []);

  return intersectingStatus;
}
