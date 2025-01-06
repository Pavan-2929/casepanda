"use server";

import { signIn, signOut } from "@/auth";

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function doLogOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }
}
