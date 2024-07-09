"use client";

import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const VerifyPage = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const email = params.get("email");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-email", {
        email,
        verifyCode: value,
      });

      console.log(response);

      toast({
        title: "success",
        description: response.data.message,
      });

      if (response.data.success) {
        router.push("/sign-in");
      }
    } catch (error: any) {
      console.log(error);

      toast({
        title: "error",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!email) {
      redirect("/");
    }
  }, [email]);

  return (
    <div className="bg-gray-100 min-h-[91vh] flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white px-14 shadow-md rounded-lg py-8 w-full max-w-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">CasePanda</h1>
          <p className="text-gray-600 font-semibold my-4">
            Verify your email address
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <InputOTP
            maxLength={4}
            value={value}
            onChange={(val) => setValue(val)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-sm font-semibold text-gray-600 text-center mt-2">
          {value ? (
            <div>
              <p>You Entered:- {value}</p>
            </div>
          ) : (
            <div>
              <p>Please enter OTP</p>
            </div>
          )}
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center mx-auto items-center gap-x-1 mt-6"
        >
          {loading ? (
            <div className="flex gap-x-2 justify-center items-center">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </div>
          ) : (
            <div>Submit</div>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default VerifyPage;
