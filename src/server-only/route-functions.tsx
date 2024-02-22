import { NextResponse } from "next/server";
import "server-only";

export async function fetchCollection(
  url: string,
  successMessage: string,
  failureMessage: string,
  collectionName: string
) {
  try {
    const response = await fetch(url); // Used in place of a database.
    const data = await response.json();
    if (!response.ok) {
      return {
        message: failureMessage,
        isError: true,
      };
    }
    return {
      message: successMessage,
      isError: false,
      [collectionName]: prepareFireBase(data),
    };
  } catch {
    return {
      message: failureMessage,
      isError: true,
    };
  }
}

function prepareFireBase(data: { [key: string]: { [key: string]: any } }) {
  const transformedData = Object.entries(data).map(([id, otherFields]) => {
    const onlyId: { id?: string } = {};
    onlyId.id = id;
    return { ...onlyId, ...otherFields };
  });
  return transformedData;
}
