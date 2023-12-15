"use server";

import { UserRole } from "@/models/types/UserRole";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export function checkPermissions(request: NextRequest, role: UserRole) {
  const accessToken = request.cookies.get("jwt");
  if (accessToken) {
    console.log("access token below");
    console.log(accessToken);
    console.log("start create test token logic");
    try {
      //create a new token and imemdiately verify it to see if its working to some degree
      let testDetailsPayload = {
        id: 10,
        firstName: "test",
        email: "test@test.com",
        role: "ADMIN",
      };

      const accessTokenTest = jwt.sign(testDetailsPayload, "test-secret", {
        expiresIn: "5m",
      }); //returns the token

      console.log("accessTokentest created");
      console.log(accessTokenTest);
      let jwtAccessTokenPayload = jwt.verify(
        accessTokenTest,
        "test-secret"
      ) as JwtPayload;
      console.log("jwtAccessTokenPayload below ");
      console.log(jwtAccessTokenPayload);
      console.log("after test verify");

      //real code
      console.log("before verify");
      const accessTokenPayload = jwt.verify(
        accessToken.value,
        "my-secret"
      ) as JwtPayload;
      console.log("after verify");

      console.log("accessToken payload");
      console.log(accessTokenPayload);

      console.log("after verify");

      const userRole = accessTokenPayload.role;
      if (userRole === role) {
        console.log("successful role check");
        return true;
      } else {
        console.log("failed role check");
        return false;
      }
    } catch {
      console.log("in catch in checkpermissions");
      return false;
    }
  }
}
