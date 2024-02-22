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
    return NextResponse.json(
      {
        message: successMessage,
        isError: false,
        [collectionName]: prepareFireBase(data),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: failureMessage,
        isError: true,
      },
      { status: 500 }
    );
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
