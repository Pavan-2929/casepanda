"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { useAppSelector } from "@/lib/redux/hook";
import { useAppDispatch } from "@/lib/redux/hook";
import { doLogOut } from "@/actions";
import { setCurrentUser } from "@/lib/redux/features/userSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  const handleLogout = async () => {
    try {
      dispatch(setCurrentUser(""));
      await doLogOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-50 border-b border-gray-300"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-between items-center py-3 max-w-7xl mx-auto px-6 sm:px-12"
      >
        <div>
          <Link href="/" className="text-lg font-semibold cursor-pointer">
            Casepanda
          </Link>
        </div>
        <div className="flex justify-around gap-x-3 md:gap-x-4 lg:gap-x-10 font-medium items-center">
          <Link href="/configure/upload">
            <Button size="sm" className="md:flex hidden">
              Create your case
              <ArrowRight />
            </Button>
          </Link>
          {currentUser && currentUser?.email === "casepanda29@gmail.com" ? (
            <Link
              href="/admin"
              className="text-primary px-3 rounded-md transition-all duration-200"
            >
              <Button
                variant="outline"
                size="sm"
                className="border border-gray-400 bg-zinc-50 hover:bg-primary hover:text-white"
              >
                Admin
              </Button>
            </Link>
          ) : null}

          {currentUser ? (
            <div>
              <Popover>
                <PopoverTrigger>
                  <img
                    src="/user.png"
                    className="w-10 h-10 rounded-full object-contain cursor-pointer pt-1"
                    alt=""
                  />
                </PopoverTrigger>
                <PopoverContent className="w-fit space-y-2 px-0 bg-slate-50 shadow-xl">
                  <p className="hover:bg-zinc-200  px-6 py-1.5">
                    <Link href="/profile">Profile</Link>
                  </p>
                  <p className="hover:bg-zinc-200  px-6 py-1.5">
                    <Link href="/orders">Orders</Link>
                  </p>
                  <p
                    className="hover:bg-zinc-200 mx-auto cursor-pointer  px-6 py-1.5"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div>
              <Link
                className="hover:bg-gray-200 px-3 py-1 rounded-md transition-all duration-200"
                href="/sign-in"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
