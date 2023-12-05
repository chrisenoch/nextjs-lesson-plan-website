"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function useFormClientStatus(
  inputRefsToTrack: Map<string, MutableRefObject<HTMLInputElement | null>>
) {
  const [elementsStatus, setElementsStatus] = useState<null | Map<
    string,
    {
      isTouched: boolean;
    }
  >>(null);

  const refsListeners = useRef<
    Map<
      string,
      {
        eventListeners: any[];
        ref: MutableRefObject<HTMLInputElement | null>;
      }
    >
  >(new Map());
  console.log("useFormClientStatus rendered");

  //create the elementStatusObjects. Run useeffect once to init the objects for each ref.
  useEffect(() => {
    initAllElements(inputRefsToTrack, setElementsStatus, refsListeners);
  }, []);

  //manage event listeners. Should run every render.
  useEffect(() => {
    //ensures only starts to run after the second render as during
    //the first render elementsStatus should be equal to null.
    if (elementsStatus !== null) {
      elementsStatus.forEach((status, id) => {
        //init event listeners if not already initialised
        if (
          refsListeners.current.get(id)?.ref.current !== null &&
          refsListeners.current.get(id)?.eventListeners.length < 1
        ) {
          //create event listener function
          const updateTouched = function updateTouch() {
            console.log("in update touched");
            const nextElementsStatus = new Map(elementsStatus);
            const currentStatus = nextElementsStatus.get(id);
            if (currentStatus) {
              const nextStatus = { ...currentStatus };
              nextStatus.isTouched = true;
              nextElementsStatus.set(id, nextStatus);
              setElementsStatus(nextElementsStatus);
            }
          };

          refsListeners.current.get(id)?.eventListeners.push(updateTouched);
          refsListeners.current
            .get(id)
            ?.ref.current?.addEventListener("blur", updateTouched);
        }
      });
    }

    return () => {
      console.log("in cleanup function");
      if (elementsStatus) {
        removeEventListeners(refsListeners.current);
      }
    };
  });

  return {
    elementsStatus,
    resetElement,
    resetAll,
  };

  //Utility functions

  function resetElement(id: string) {
    console.log("resetElement called with id: " + id);
  }

  function resetAll() {
    initAllElements(inputRefsToTrack, setElementsStatus, refsListeners);
  }
}

function initAllElements(
  inputRefsToTrack: Map<string, MutableRefObject<HTMLInputElement | null>>,
  setElementsStatus,
  refsListeners: MutableRefObject<
    Map<
      string,
      { eventListeners: any[]; ref: MutableRefObject<HTMLInputElement | null> }
    >
  >
) {
  const nextElementsStatus = new Map();
  inputRefsToTrack.forEach((ref, id) => {
    //To do: add options for form as a whole and for dirty, pristine, etc.
    //To do: add option to reinit all variables as well.
    const status: {
      isTouched: boolean;
    } = {
      isTouched: false,
    };
    nextElementsStatus.set(id, status);
    setElementsStatus(nextElementsStatus);

    const listeners: {
      eventListeners: any[];
      ref: MutableRefObject<HTMLInputElement | null>;
    } = {
      eventListeners: [],
      ref, //ref is null here because at first the element is not int he dom
    };
    if (refsListeners.current) {
      refsListeners.current.set(id, listeners);
    }
  });
}

function removeEventListeners(
  refsListeners: Map<
    string,
    {
      eventListeners: any[];
      ref: MutableRefObject<HTMLInputElement | null>;
    }
  >
) {
  refsListeners.forEach((status, id) => {
    status.eventListeners.forEach((eventListenerFn) => {
      if (status.ref.current) {
        status.ref.current.removeEventListener("blur", eventListenerFn);
      }
    });
    status.eventListeners = [];
  });
}
