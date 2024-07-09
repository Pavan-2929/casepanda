"use server";

import { signIn, signOut } from "@/auth";

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function doLogOut() {
  try {
    await signOut();
    console.log("Logged out");
  } catch (error) {
    console.log(error);
  }
}
