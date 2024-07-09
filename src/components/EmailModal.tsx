import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";



const EmailModal = ({toggleModal}: any) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 md:p-10 rounded-lg shadow-lg md:w-[40vw] w-full">
        <div onClick={toggleModal} className="absolute cursor-pointer right-10 top-8 font-bold text-lg bg-red-500 text-white rounded-md px-2.5 py-1">
          {" "}
          X{" "}
        </div>
        <div className="font-semibold">
          <h1>Enter your Email Address to verify</h1>
        </div>
        <div className="mt-8">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="font-semibold"/>
          <Button className="flex justify-center mx-auto items-center gap-x-1 mt-6">
            {loading ? (
              <div className="flex gap-x-2 justify-center items-center">
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </div>
            ) : (
              <div>Sign-in</div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
