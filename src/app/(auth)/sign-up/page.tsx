"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import bcryptjs from "bcryptjs";
import { redirect, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { ApiResponse } from "@/types/ApiResponse";
import { useAppSelector } from "@/lib/redux/hook";

const SignUpPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  console.log(currentUser);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/sign-up", data);

      toast({
        title: "success",
        description: response.data.message,
      });

      if (response.data.success) {
        router.push(`/verify?email=${data.email}`);
      }
    } catch (error) {
      const customError = error as AxiosError<ApiResponse>;
      toast({
        title: "error",
        description:
          customError.response?.data.message ||
          "Something went wrong | Please try again",
      });

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return (
    <div className="bg-gray-100 min-h-[91vh] flex justify-center items-center">
      <div className="bg-white px-4 sm:px-14 shadow-md rounded-lg py-8 w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">CasePanda</h1>
          <p className="text-gray-600 font-semibold my-4">
            Sign-up to start your joureny
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="sm:space-y-6 space-y-3"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} placeholder="Username" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Email" type="email" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} placeholder="Password" type="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="flex justify-center mx-auto items-center gap-x-1 mt-6">
              {loading ? (
                <div className="flex gap-x-2 justify-center items-center">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                </div>
              ) : (
                <div>Sign-up</div>
              )}
            </Button>
          </form>
        </Form>
        <div className="flex gap-x-1 justify-center text-gray-600 mt-8 text-center">
          <p>Already have an account?</p>
          <Link href="/sign-in" className="hover:underline hover:text-gray-700">
            Sign-In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
