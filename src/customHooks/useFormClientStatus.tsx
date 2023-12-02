"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function useFormClientStatus(
  inputRefsToTrack: Map<string, MutableRefObject<HTMLInputElement | null>>
) {
  const [inputRefsInfo, setInputRefsInfo] = useState<null | Map<
    string,
    {
      isTouched: boolean;
      isInDom: boolean;
      eventListeners: any[];
      ref: MutableRefObject<HTMLInputElement | null>;
    }
  >>(null);

  //create the refsInfoObjects. Run once to init the objects for each ref.
  useEffect(() => {
    const nextInputRefsInfo = new Map();

    inputRefsToTrack.forEach((ref, id) => {
      //To do: add options for form as a whole and for dirty, pristine, etc.
      //To do: add option to reinit all variables as well.
      const status: {
        isTouched: boolean;
        isInDom: boolean;
        eventListeners: any[];
        ref: MutableRefObject<HTMLInputElement | null>;
      } = {
        isTouched: false,
        isInDom: false,
        eventListeners: [],
        ref,
      };
      nextInputRefsInfo.set(id, status);
      setInputRefsInfo(nextInputRefsInfo);
    });
  }, []);

  //manage event listeners. Should run every render.
  useEffect(() => {
    //ensures only starts to run after the second render as during
    //the first render inputRefsInfo should equal null.
    if (inputRefsInfo !== null) {
      let hasChanged = false;
      const nextInputRefsInfo = new Map();
      inputRefsInfo.forEach((status, id) => {
        //init event listeners if not already initialised
        if (!status.ref !== null && status.eventListeners.length < 1) {
          //
          hasChanged = true;

          const newStatus: {
            isTouched: boolean;
            isInDom: boolean;
            eventListeners: any[];
            ref: MutableRefObject<HTMLInputElement | null>;
          } = {
            isInDom: true,
            isTouched: false,
            ref: status.ref,
            eventListeners: [],
          };

          //create event listener function
          const updateTouched = () => {
            const nextInputRefsInfo = new Map(inputRefsInfo);
            const currentStatus = nextInputRefsInfo.get(id);
            if (currentStatus) {
              const nextStatus = { ...currentStatus };
              nextStatus.isTouched = true;
              nextInputRefsInfo.set(id, nextStatus);
            }
          };

          newStatus.eventListeners.push(updateTouched);

          newStatus.ref.current!.addEventListener("blur", updateTouched);

          nextInputRefsInfo.set(id, newStatus);
        } else if (!status.ref === null && status.eventListeners.length > 0) {
          hasChanged = true;
          //remove event listeners. Maybe an element of the component is removed from the
          //dom but not the entire component.
          const currentStatus = inputRefsInfo.get(id);
          if (currentStatus) {
            //const nextStatus = { ...currentStatus };
            currentStatus.eventListeners.forEach((eventListenerFn) => {
              // Possible bug: ensure the event function is the original and not a copy.
              currentStatus.ref.current!.removeEventListener(
                "blur",
                eventListenerFn
              );

              //update status.EventListeners with empty array
              //Possible bug, maybe this should not trigger a re-render.
              const nextStatus = { ...currentStatus };
              nextStatus.eventListeners = [];
              nextInputRefsInfo.set(id, nextStatus);
            });
          }
        }
      });
      if (hasChanged) {
        setInputRefsInfo(nextInputRefsInfo);
      }
    }

    return () => {
      if (inputRefsInfo) {
        removeEventListeners(inputRefsInfo);
      }
    };
  });

  //only do below after the first render.
  //check if isInDom and if event listener needs to be removed or added
  //Run useEffect everytime. Only setup event listener if needs setting up and only remove
  //event listeners if necessary
  //Option 1. Add event listener functions to the array the first time it is in the dom
  // (ref doesn't equal null).
  //Removing: we check if isInDom. If false, check the array length.
  //If array length not zero, remove event listeners
  //If isInDom (ref !== false), check array length. If not zero, we do not init event listeners.
  //test I can store functions in array and remove event listeners properly.

  //callback: onblur: set isTouched to false.

  //return map with ids and status object
  //To do: Erase the event listener functions.
  return inputRefsInfo;
}

function removeEventListeners(
  inputRefsInfo: Map<
    string,
    {
      isTouched: boolean;
      isInDom: boolean;
      eventListeners: any[];
      ref: MutableRefObject<HTMLInputElement | null>;
    }
  >
) {
  inputRefsInfo.forEach((status, id) => {
    status.eventListeners.forEach((eventListenerFn) => {
      status.ref.current!.removeEventListener("blur", eventListenerFn);
    });
  });
}
