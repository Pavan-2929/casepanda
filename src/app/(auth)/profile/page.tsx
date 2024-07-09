"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/redux/hook";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/redux/hook";
import { setCurrentUser } from "@/lib/redux/features/userSlice";
import { redirect, useRouter } from "next/navigation";
import NextImage from "next/image";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const [address, setAddress] = useState({
    phone: currentUser.address?.phone || "",
    street: currentUser.address?.street || "",
    area: currentUser.address?.area || "",
    city: currentUser.address?.city || "",
    state: currentUser.address?.state || "",
    pincode: currentUser.address?.pincode || "",
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/update-user", {
        address,
        email: currentUser.email,
      });
      dispatch(setCurrentUser(response.data.user));
      toast({
        title: "success",
        description: response.data.message,
      });
      router.back();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: "Please fill all fields",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return redirect("/");
    }
  }, [currentUser]);

  console.log(address);

  return (
    <div className="bg-gray-100 h-full mx-auto flex flex-col items-center lg:p-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white px-4 sm:px-14 shadow-md rounded-lg py-8 w-full max-w-lg"
      >
        <div className="flex items-center justify-between gap-x-2 md:gap-x-10 border-b-2 border-gray-300 ">
          <div>
            <NextImage
              src="/user.png"
              alt="userimage"
              height={40}
              width={40}
              className="w-40 h-40 object-contain"
            />
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <Input value={currentUser.username} readOnly />
            <Input value={currentUser.email} readOnly />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          <Input
            name="phone"
            value={address.phone || currentUser.address?.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <Input
            name="street"
            value={address.street || currentUser.address?.street}
            onChange={handleChange}
            placeholder="Street"
          />
          <div className="flex gap-x-4">
            <Input
              name="area"
              value={address.area || currentUser.address?.area}
              onChange={handleChange}
              placeholder="Area"
            />
            <Input
              name="city"
              value={address.city || currentUser.address?.city  }
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="flex gap-x-4">
            <Input
              name="state"
              value={address.state || currentUser.address?.state}
              onChange={handleChange}
              placeholder="State"
            />
            <Input
              name="pincode"
              value={address.pincode || currentUser.address?.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />
          </div>
          <Button className="flex justify-center mx-auto items-center gap-x-1">
            {loading ? (
              <div className="flex gap-x-2 justify-center items-center">
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </div>
            ) : (
              <div>Update</div>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
