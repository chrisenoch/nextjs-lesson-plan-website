"use client";

import { useEffect, useState } from "react";

export default function useIntersectionObserver(
  targetElementIds: string[],
  rootMargins: { mt: string; mr: string; mb: string; ml: string } = {
    mt: "0px",
    mr: "0px",
    mb: "-80%",
    ml: "0px",
  }
) {
  const [intersectingStatus, setIntersectingStatus] = useState<
    string | null //targetElementId
  >(null);

  const rootMargin = Object.values(rootMargins).join(" ");

  useEffect(() => {
    let options = {
      rootMargin: rootMargin,
      threshold: 0,
    };

    const targetItemsByTarget = new Map();
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      console.log("Intersection callback invoked");
      const activeIntersectors: {
        id: string;
        target: IntersectionObserverEntry;
        isIntersecting: boolean;
      }[] = [];

      entries.forEach((entry) => {
        console.log("debug here");
        const targetItem = targetItemsByTarget.get(entry.target);
        if (entry.isIntersecting) {
          console.log("intersecting");
          targetItem.isIntersecting = true;
          activeIntersectors.push(targetItem);
        } else {
          targetItem.isIntersecting = false;
        }
      });

      if (activeIntersectors.length > 1) {
        console.log("******* printing active interceptors");
        activeIntersectors.forEach((ele) => console.log(ele.id));

        const activeIntersector = activeIntersectors.pop(); //only set the last one to active
        setIntersectingStatus(activeIntersector!.id);
      } else if (activeIntersectors.length === 1) {
        setIntersectingStatus(activeIntersectors[0].id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const targetItems = targetElementIds.map((targetElementId) => {
      return {
        id: targetElementId,
        target: document.getElementById(targetElementId),
        isInterSecting: false,
      };
    });

    //observe targets and add them to the map
    targetItems.forEach((targetItem) => {
      if (targetItem.target) {
        targetItemsByTarget.set(targetItem.target, targetItem);
        observer.observe(targetItem.target);
      } else {
        throw new Error(
          "Unable to observe because targetElement not found in DOM"
        );
      }
    });

    return () => {
      targetItems.forEach((targetItem) => {
        if (targetItem.target) {
          observer.unobserve(targetItem.target);
        }
      });
    };
  }, []);

  return intersectingStatus;
}
