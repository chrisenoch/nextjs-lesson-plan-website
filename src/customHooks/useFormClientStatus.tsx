"use client";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useFormClientStatus(
  inputRefsToTrack: Map<string, MutableRefObject<HTMLInputElement | null>>
) {
  const [elementsStatus, setElementsStatus] = useState<null | Map<
    string,
    {
      isTouched: boolean;
      hasBeenFocused: boolean;
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

  //create the elementStatusObjects. Run useeffect once to init the objects for each ref.
  useEffect(() => {
    initAllElements(inputRefsToTrack, setElementsStatus, refsListeners);
  }, [inputRefsToTrack]);

  //manage event listeners. Should run every render.
  useEffect(() => {
    //ensures only starts to run after the second render as during
    //the first render elementsStatus should be equal to null.
    if (elementsStatus !== null) {
      elementsStatus.forEach((status, id) => {
        //init event listeners if not already initialised
        if (
          refsListeners.current.get(id)?.ref.current !== null &&
          refsListeners.current.get(id)!.eventListeners.length < 1
        ) {
          //create event listener function
          const updateTouched = function updateTouch() {
            const nextElementsStatus = new Map(elementsStatus);
            const currentStatus = nextElementsStatus.get(id);
            if (currentStatus) {
              const nextStatus = { ...currentStatus };
              nextStatus.isTouched = true;
              nextElementsStatus.set(id, nextStatus);
              setElementsStatus(nextElementsStatus);
            }
          };

          const updateFocused = function updateFocus() {
            const nextElementsStatus = new Map(elementsStatus);
            const currentStatus = nextElementsStatus.get(id);
            if (currentStatus) {
              const nextStatus = { ...currentStatus };
              nextStatus.hasBeenFocused = true;
              nextElementsStatus.set(id, nextStatus);
              setElementsStatus(nextElementsStatus);
            }
          };

          refsListeners.current
            .get(id)
            ?.eventListeners.push({ event: "blur", fn: updateTouched });
          refsListeners.current
            .get(id)
            ?.eventListeners.push({ event: "focus", fn: updateFocused });
          refsListeners.current
            .get(id)
            ?.ref.current?.addEventListener("blur", updateTouched);
          refsListeners.current
            .get(id)
            ?.ref.current?.addEventListener("focus", updateFocused);
        }
      });
    }

    return () => {
      if (elementsStatus) {
        removeEventListeners(refsListeners.current);
      }
    };
  });

  return {
    elementsStatus,
    resetElement,
    resetAll,
    setAllToTouched,
  };

  /*
  Hook utility functions
   */

  function resetElement(id: string) {
    const status = elementsStatus?.get(id);
    if (status) {
      const newStatus = { ...status, isTouched: false, hasBeenFocused: false };
      const nextElementsStatus = new Map(elementsStatus);
      nextElementsStatus.set(id, newStatus);
      setElementsStatus(nextElementsStatus);
    }
  }

  function resetAll() {
    const nextElementsStatus = new Map(elementsStatus);
    elementsStatus?.forEach((status, id) => {
      if (status) {
        const newStatus = {
          ...status,
          isTouched: false,
          hasBeenFocused: false,
        };

        nextElementsStatus.set(id, newStatus);
        setElementsStatus(nextElementsStatus);
      }
    });
  }

  function setAllToTouched() {
    if (elementsStatus !== null) {
      const nextElementsStatus = new Map(elementsStatus);
      elementsStatus.forEach((status, id) => {
        const nextStatus = { ...status };
        nextStatus.isTouched = true;
        nextElementsStatus.set(id, nextStatus);
      });
      setElementsStatus(nextElementsStatus);
    }
  }
}

function initAllElements(
  inputRefsToTrack: Map<string, MutableRefObject<HTMLInputElement | null>>,
  setElementsStatus: Dispatch<
    SetStateAction<Map<
      string,
      { isTouched: boolean; hasBeenFocused: boolean }
    > | null>
  >,
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
    const status: {
      isTouched: boolean;
      hasBeenFocused: boolean;
    } = {
      isTouched: false,
      hasBeenFocused: false,
    };
    nextElementsStatus.set(id, status);
    setElementsStatus(nextElementsStatus);

    const listeners: {
      eventListeners: any[];
      ref: MutableRefObject<HTMLInputElement | null>;
    } = {
      eventListeners: [],
      ref, //ref is null here because at first the element is not in the dom
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
    status.eventListeners.forEach((eventListener) => {
      if (status.ref.current) {
        status.ref.current.removeEventListener(
          eventListener.event,
          eventListener.fn
        );
      }
    });
    status.eventListeners = [];
  });
}
