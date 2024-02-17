"use client";

import { getKeysAsValues } from "@/utils/object-functions";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useFormClientStatus(
  formFieldRefsToTrack: FormFieldRefsToTrack
) {
  const [formFieldsStatus, setFormFieldsStatus] =
    useState<FormFieldsStatus>(null);
  const formFieldRefsListeners = useRef<FormFieldRefsListeners>(new Map());

  useEffect(() => {
    initAllFormFields(
      formFieldRefsToTrack,
      setFormFieldsStatus,
      formFieldRefsListeners
    );
  }, [formFieldRefsToTrack]);

  //Manage event listeners.
  useEffect(() => {
    const formFieldRefsListenersToCleanUp = formFieldRefsListeners.current; //As far as I understand, if we use
    //formFieldRefsListeners.current in the return cleanup function, the return function will close over
    //formFieldRefsListeners.current and then it could become stale. See the ESLint warnign if you replace formFieldRefsListenersToCleanUp with
    //formFieldRefsListeners.current in the dependencies of this useEffect.

    //ensures only starts to run after the second render as during
    //the first render formFieldsStatus should be equal to null.
    if (formFieldsStatus !== null) {
      formFieldsStatus.forEach((_, id) => {
        //init event listeners for the form field if not already initialised
        if (
          formFieldRefsListeners.current.get(id)?.formFieldRef.current !==
            null &&
          formFieldRefsListeners.current.get(id)!.eventListeners.length < 1
        ) {
          //create event listener functions
          const updateTouched = function updateTouch() {
            const nextFormFieldsStatus = new Map(formFieldsStatus);
            const currentStatus = nextFormFieldsStatus.get(id);
            if (currentStatus) {
              const nextFormFieldStatus = { ...currentStatus };
              nextFormFieldStatus.isTouched = true;
              nextFormFieldsStatus.set(id, nextFormFieldStatus);
              setFormFieldsStatus(nextFormFieldsStatus);
            }
          };
          const updateFocused = function updateFocus() {
            const nextFormfieldsStatus = new Map(formFieldsStatus);
            const currentStatus = nextFormfieldsStatus.get(id);
            if (currentStatus) {
              const nextFormFieldStatus = { ...currentStatus };
              nextFormFieldStatus.hasBeenFocused = true;
              nextFormfieldsStatus.set(id, nextFormFieldStatus);
              setFormFieldsStatus(nextFormfieldsStatus);
            }
          };

          setEventListener(id, formFieldRefsListeners, updateTouched, "blur");
          setEventListener(id, formFieldRefsListeners, updateFocused, "focus");
        }
      });
    }

    return () => {
      if (formFieldsStatus) {
        removeEventListeners(formFieldRefsListenersToCleanUp); //removeEventListeners(refsListeners.current)- Changed due to ESLint warning.
      }
    };
  }, [formFieldsStatus]);

  return {
    formFieldsStatus,
    resetField,
    resetAllFields,
    setAllToTouched,
    getFieldNames,
  };

  /*
  Hook utility functions
   */

  function getFieldNames() {
    return getKeysAsValues(formFieldRefsToTrack);
  }

  function resetField(id: string) {
    const status = formFieldsStatus?.get(id);
    if (status) {
      const newStatus = { ...status, isTouched: false, hasBeenFocused: false };
      const nextFormFieldsStatus = new Map(formFieldsStatus);
      nextFormFieldsStatus.set(id, newStatus);
      setFormFieldsStatus(nextFormFieldsStatus);
    }
  }

  function resetAllFields() {
    const nextFormFieldsStatus = new Map(formFieldsStatus);
    formFieldsStatus?.forEach((status, id) => {
      if (status) {
        const newStatus = {
          ...status,
          isTouched: false,
          hasBeenFocused: false,
        };

        nextFormFieldsStatus.set(id, newStatus);
        setFormFieldsStatus(nextFormFieldsStatus);
      }
    });
  }

  function setAllToTouched() {
    if (formFieldsStatus !== null) {
      const nextFormFieldsStatus = new Map(formFieldsStatus);
      formFieldsStatus.forEach((status, id) => {
        const nextStatus = { ...status };
        nextStatus.isTouched = true;
        nextFormFieldsStatus.set(id, nextStatus);
      });
      setFormFieldsStatus(nextFormFieldsStatus);
    }
  }
}

function setEventListener(
  id: string,
  formFieldRefsListeners: MutableRefObject<FormFieldRefsListeners>,
  callback: () => void,
  eventName: string
) {
  formFieldRefsListeners.current
    .get(id)
    ?.eventListeners.push({ event: eventName, fn: callback });
  formFieldRefsListeners.current
    .get(id)
    ?.formFieldRef.current?.addEventListener(eventName, callback);
}

function initAllFormFields(
  formFieldRefsToTrack: FormFieldRefsToTrack,
  setFormFieldsStatus: Dispatch<SetStateAction<FormFieldsStatus>>,
  formFieldRefsListeners: MutableRefObject<FormFieldRefsListeners>
) {
  const nextFormFieldsStatus = new Map();
  Object.entries(formFieldRefsToTrack).forEach(([id, ref]) => {
    //To do: add options for form as a whole and for dirty, pristine, etc.
    const status: {
      isTouched: boolean;
      hasBeenFocused: boolean;
    } = {
      isTouched: false,
      hasBeenFocused: false,
    };
    nextFormFieldsStatus.set(id, status);
    setFormFieldsStatus(nextFormFieldsStatus);

    const listeners: {
      eventListeners: any[];
      formFieldRef: MutableRefObject<HTMLInputElement | null>;
    } = {
      eventListeners: [],
      formFieldRef: ref, //ref is null here because at first the element is not in the dom
    };
    if (formFieldRefsListeners.current) {
      formFieldRefsListeners.current.set(id, listeners);
    }
  });
}

function removeEventListeners(formFieldRefsListeners: FormFieldRefsListeners) {
  formFieldRefsListeners.forEach((status) => {
    status.eventListeners.forEach((eventListener) => {
      if (status.formFieldRef.current) {
        status.formFieldRef.current.removeEventListener(
          eventListener.event,
          eventListener.fn
        );
      }
    });
    status.eventListeners = [];
  });
}

type FormFieldRefsToTrack = {
  [key: string]: MutableRefObject<HTMLInputElement | null>;
};

type FormFieldsStatus = Map<
  string,
  {
    isTouched: boolean;
    hasBeenFocused: boolean;
  }
> | null;

type FormFieldRefsListeners = Map<
  string,
  {
    eventListeners: any[];
    formFieldRef: MutableRefObject<HTMLInputElement | null>;
  }
>;
