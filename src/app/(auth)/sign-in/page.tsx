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
import { signInSchema } from "@/schemas/SigninSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { doCredentialLogin } from "@/actions/index";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setCurrentUser } from "@/lib/redux/features/userSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const SignInPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/sign-in", data);

      await doCredentialLogin(data);

      if (!response.data.success) {
        return toast({
          title: "error",
          description: response.data.message,
        });
      }

      dispatch(setCurrentUser(response.data.user));

      router.push("/");

      toast({
        title: "success",
        description: response.data.message,
      });

      console.log(response);
    } catch (error) {
      const customError = error as AxiosError<ApiResponse>;

      toast({
        title: "error",
        description:
          customError.response?.data.message ||
          "Please provide valid credentials | try again",
      });

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const response = await axios.post("/api/verify-forget-password-email", {
        email,
      });
      toast({
        title: "success",
        description: response.data.message,
      });
      router.push("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  };

  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return (
    <>
      <div className="bg-gray-100 min-h-[91vh] flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white px-4 sm:px-14 shadow-md rounded-lg py-8 w-full max-w-lg"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold">CasePanda</h1>
            <p className="text-gray-600 font-semibold my-4">
              Sign-in to start your joureny
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" {...field} placeholder="email" />
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
                    <Input type="password" {...field} placeholder="password" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Dialog>
                  <DialogTrigger className="text-gray-600 hover:text-gray-700 hover:underline underline-offset-2 cursor-pointer flex ml-auto">
                    Forget-Password ?
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Enter your Email{" "}
                        <span className="md:inline hidden">
                          for verification
                        </span>
                      </DialogTitle>
                      <DialogDescription>
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="font-semibold mt-6"
                          placeholder="email"
                        />
                        <Button
                          onClick={handleForgetPassword}
                          className="flex justify-center mx-auto items-center gap-x-1 mt-6"
                        >
                          {modalLoading ? (
                            <div className="flex gap-x-2 justify-center items-center">
                              <Loader2 className="h-4 w-4 animate-spin" />{" "}
                              Please wait
                            </div>
                          ) : (
                            <div>Submit</div>
                          )}
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <Button className="flex justify-center mx-auto items-center gap-x-1">
                {loading ? (
                  <div className="flex gap-x-2 justify-center items-center">
                    <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                  </div>
                ) : (
                  <div>Sign-in</div>
                )}
              </Button>
            </form>
          </Form>
          <div className="flex gap-x-1 justify-center text-gray-600 mt-8 text-center">
            <p>Do not have an account?</p>
            <Link
              href="/sign-up"
              className="hover:underline hover:text-gray-700"
            >
              Sign-In
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignInPage;
