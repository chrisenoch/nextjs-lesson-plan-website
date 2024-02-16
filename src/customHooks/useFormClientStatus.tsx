"use client";

import { PropertyNamesAsStrings } from "@/models/types/TypeScriptHelpers/PropertyNamesAsStrings";
import { getKeysAsValues } from "@/utils/object-functions";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useFormClientStatus(inputRefsToTrack: {
  [key: string]: MutableRefObject<HTMLInputElement | null>;
}) {
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

  //create the elementStatusObjects. Run useEffect once to init the objects for each ref.
  useEffect(() => {
    initAllElements(inputRefsToTrack, setElementsStatus, refsListeners);
  }, [inputRefsToTrack]);

  //Manage event listeners.
  useEffect(() => {
    console.log("useEffect in form hook rendered");
    const refsListenersToCleanUp = refsListeners.current; //As far as I understand, if we use
    //refsListeners.current in the return cleanup function, the return function will close over
    //refsListeners.current and then it could become stale. See the ESLint warnign if you replace refsListenersToCleanUp with
    //refsListeners.current in the dependencies of this useEffect.

    //ensures only starts to run after the second render as during
    //the first render elementsStatus should be equal to null.
    if (elementsStatus !== null) {
      elementsStatus.forEach((_, id) => {
        //init event listeners for the element (e.g. form field) if not already initialised
        if (
          refsListeners.current.get(id)?.ref.current !== null &&
          refsListeners.current.get(id)!.eventListeners.length < 1
        ) {
          //create event listener functions
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

          setEventListener(id, refsListeners, updateTouched, "blur");
          setEventListener(id, refsListeners, updateFocused, "focus");
        }
      });
    }

    return () => {
      if (elementsStatus) {
        removeEventListeners(refsListenersToCleanUp); //removeEventListeners(refsListeners.current)- Changed due to ESLint warning.
      }
    };
  }, [elementsStatus]);

  return {
    elementsStatus,
    resetElement,
    resetAll,
    setAllToTouched,
    getFieldNames,
  };

  /*
  Hook utility functions
   */

  function getFieldNames() {
    return getKeysAsValues(inputRefsToTrack);
  }

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

function setEventListener(
  id: string,
  refsListeners: MutableRefObject<
    Map<
      string,
      { eventListeners: any[]; ref: MutableRefObject<HTMLInputElement | null> }
    >
  >,
  callback: () => void,
  eventName: string
) {
  refsListeners.current
    .get(id)
    ?.eventListeners.push({ event: eventName, fn: callback });
  refsListeners.current
    .get(id)
    ?.ref.current?.addEventListener(eventName, callback);
}

function initAllElements(
  //inputRefsToTrack: Map<string, MutableRefObject<HTMLInputElement | null>>,
  inputRefsToTrack: {
    [key: string]: MutableRefObject<HTMLInputElement | null>;
  },
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
  Object.entries(inputRefsToTrack).forEach(([id, ref]) => {
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
