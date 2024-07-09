"use client"

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const PaymentFailedPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-24 lg:py-40">
      <div className="bg-white p-9 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          We are sorry, but your payment could not be processed at this time.
          Please try with cash on delivery option.
        </p>
        <Button onClick={() => router.back()}>Try Again</Button>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
