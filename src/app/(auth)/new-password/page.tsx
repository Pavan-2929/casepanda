"use client";

import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const email = params.get("email");
  const { toast } = useToast();
  const router = useRouter();

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/change-password", {
        email,
        password,
      });

      toast({
        title: "success",
        description: response.data.message,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
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
         className="bg-white px-4 sm:px-14 shadow-md rounded-lg py-8 w-full max-w-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Casepanda</h1>
          <p className="text-gray-600 font-semibold my-4">
            Enter your new Password
          </p>
        </div>
        <div>
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            onClick={handlePasswordSubmit}
            className="flex justify-center mx-auto items-center gap-x-1 mt-6"
          >
            {loading ? (
              <div className="flex gap-x-2 justify-center items-center">
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </div>
            ) : (
              <div>Sign-up</div>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NewPasswordPage;
