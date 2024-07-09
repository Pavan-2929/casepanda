"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { doLogOut } from "@/actions/index";
import { useToast } from "./ui/use-toast";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await doLogOut();

      toast({
        title: "success",
        description: "You have been signed out",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "error",
        description: "something went wrong, try again",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      onClick={handleLogOut}
      className="flex mx-auto justify-center"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Sign out"
      )}
    </Button>
  );
};

export default LogOutButton;
