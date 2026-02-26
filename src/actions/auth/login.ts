"use server";

import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { loginUserZodSchema } from "@/validation/auth.validation";
import { setCookie } from "./tokenHandlers";
import { redirect } from "next/navigation";

export const loginUser = async (_initialState: any, formData: FormData) => {
  const loginFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const zodResponse = loginUserZodSchema.safeParse(loginFormData);

  if (!zodResponse.success) {
    return getZodErrorResponse(zodResponse, loginFormData);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zodResponse.data)
      },
    );

    const result = await res.json();

    if (result && result.error) {
      return result;
    }

    await setCookie("token", result.token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
      sameSite: "none",
    });

    redirect("/dashboard?loggedIn=true")
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      error: "Login failed",
    };
  }
};
