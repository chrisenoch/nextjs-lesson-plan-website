import { NextResponse } from "next/server";
import "server-only";

export async function firebaseGETCollection(
  url: string,
  successMessage: string,
  failureMessage: string
): Promise<
  | {
      message: string;
      isError: true;
    }
  | {
      message: string;
      isError: false;
      data: any;
    }
> {
  try {
    const response = await fetch(url);
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
      data: prepareFireBase(data),
    };
  } catch {
    return {
      message: failureMessage,
      isError: true,
    };
  }
}

export async function firebaseGETById(
  url: string,
  successMessage: string,
  failureMessage: string
): Promise<
  | {
      message: string;
      isError: true;
    }
  | {
      message: string;
      isError: false;
      data: any;
    }
> {
  try {
    const response = await fetch(url);
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
      data,
    };
  } catch {
    return {
      message: failureMessage,
      isError: true,
    };
  }
}

export async function firebasePOST(
  url: string,
  successMessage: string,
  failureMessage: string,
  dataToPost: any
): Promise<
  | {
      message: string;
      isError: true;
    }
  | {
      message: string;
      isError: false;
      data: any;
    }
> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    });
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
      data: data.name,
    };
  } catch {
    return {
      message: failureMessage,
      isError: true,
    };
  }
}

export async function firebaseDELETE(
  url: string,
  successMessage: string,
  failureMessage: string
) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return {
        message: failureMessage,
        isError: true,
      };
    }
    return {
      message: successMessage,
      isError: false,
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
