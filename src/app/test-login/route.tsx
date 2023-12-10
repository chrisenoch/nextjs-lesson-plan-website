//possible bug: ensure NextJs does not cache the request.
export async function GET(request: Request) {
  //To do: remove search params
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  //
  console.log("inside test login");

  async function postJSON(data: any) {
    let result;
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
      result = { error: "Post to login failed" };
    }
    return result;
  }

  const result = await postJSON({ username: "admin", password: "admin" });
  console.log("result in test-login ");
  console.log(result);

  return Response.json({ result });
}
