"use client";

import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-50">
      <section className="my-[5%]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            className="lg:max-w-[60%]"
          >
            <div className="lg:text-6xl text-5xl lg:text-start text-center font-bold">
              <p>Your Image on a</p>
              <p className="xl:mt-6">
                <span className="xl:bg-green-600 xl:text-white xl:px-3 xl:rounded-sm xl:py-1">
                  Custom
                </span>{" "}
                Phone Case
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800 leading-8 max-w-[95%] mx-auto my-12 text-xl tracking-wide text-center lg:text-start">
                Capture your favorite memories with your own, one-of-one phone
                case. CaseCobra allows you to protect your memories, not just
                your phone case
              </p>
            </div>
            <div className="text-gray-800 font-semibold my-12 text-md flex flex-col relative items-center justify-center lg:items-start">
              <div className="space-y-1.5 ">
                <div className="flex items-center gap-x-1.5">
                  <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
                  <p className="tracking-wide">
                    High quality, durable material
                  </p>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
                  <p className="tracking-wide">5 year print guarantee</p>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
                  <p className="tracking-wide">
                    Modern iPhone models supported
                  </p>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
                  <p className="tracking-wide">Scratch and water resistance</p>
                </div>
              </div>
              <div className="absolute right-10 xl:block hidden -top-10 ">
                <img src="/panda4.png" alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 items-center lg:items-start lg:flex-row gap-x-4 my-12">
              <div className="flex items-center -space-x-4">
                <img
                  src="/users/user-1.png"
                  alt="user-image"
                  className="h-10 w-10 rounded-full"
                />
                <img
                  src="/users/user-2.png"
                  alt="user-image"
                  className="h-10 w-10 rounded-full"
                />
                <img
                  src="/users/user-3.png"
                  alt="user-image"
                  className="h-10 w-10 rounded-full"
                />
                <img
                  src="/users/user-4.jpg"
                  alt="user-image"
                  className="h-10 w-10 rounded-full"
                />
                <img
                  src="/users/user-5.jpg"
                  alt="user-image"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex gap-x-0.5 items-center mb-1 lg:justify-start justify-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                </div>
                <div className="text-sm font-semibold">
                  <p>1250+ happy customers</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            className="flex justify-center mx-auto"
          >
            <div className="relative">
              <img
                src="/your-image.png"
                className="absolute hidden xl:block -top-14 left-56 w-40 z-50"
                alt="your-image"
              />
              <Phone imgSrc="/dog.jpg" className="w-64 mt-8" />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 my-[10%]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl text-center lg:text-6xl font-bold my-16"
        >
          <p className="xl:leading-[80px] ">Upload your photo and</p>
          <p className="xl:leading-[80px]">
            get{" "}
            <span className="xl:bg-green-600 xl:text-white xl:px-3 xl:rounded-sm xl:py-1">
              your own case
            </span>
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center md:flex-row flex-col lg:gap-x-8 gap-x-2 h-full mt-28"
        >
          <div>
            <img src="/horse.jpg" alt="" className="lg:w-96 w-72" />
          </div>
          <div className="xl:my-auto rotate-90 md:rotate-0 my-14">
            <img src="/arrow.png" alt="" className="" />
          </div>
          <div>
            <Phone imgSrc="/horse.jpg" className="w-64" />
          </div>
        </motion.div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-14 my-[5%]">
        <div className="text-center">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-bold text-white bg-primary px-3 py-1.5 rounded-sm w-fit mx-auto"
          >
            Our happy Clients
          </motion.h1>
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-medium text-gray-800 leading-8 my-12 text-xl tracking-wide text-center max-w-[800px] mx-auto"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            illum possimus iure libero molestiae error incidunt cupiditate
            laudantium veniam optio.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 px-6 py-4 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <img
                  src="/users/user-1.png"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <p className="text-lg font-semibold">David Harbour</p>
              </div>
              <div className="flex gap-x-0.5 items-center mb-1 lg:justify-start justify-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-800">
                The case feels durable and I even got a compliment on the
                design. Had the case for two and a half months now and the image
                is super clear.
              </p>
            </div>
            <div className="flex justify-between mt-6 items-center">
              <div className="flex items-center gap-x-2 text-sm">
                <Check className="text-primary font-semibold h-4 w-4" />
                <p className="text-gray-900">verified Purchase</p>
              </div>
              <div>
                <p className="text-gray-900 text-sm">20 Feb, 2024</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 px-6 py-4 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <img
                  src="/users/user-2.png"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <p className="text-lg font-semibold">Max Mayfield</p>
              </div>
              <div className="flex gap-x-0.5 items-center mb-1 lg:justify-start justify-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-800">
                I have been using this case for three months, and it still looks
                brand new. The material feels high-quality, and I get
                compliments on it all the time.
              </p>
            </div>
            <div className="flex justify-between mt-6 items-center">
              <div className="flex items-center gap-x-2 text-sm">
                <Check className="text-primary font-semibold h-4 w-4" />
                <p className="text-gray-900">verified Purchase</p>
              </div>
              <div>
                <p className="text-gray-900 text-sm">20 Jan, 2024</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 px-6 py-4 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <img
                  src="/users/user-3.png"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <p className="text-lg font-semibold">Adam Jone</p>
              </div>
              <div className="flex gap-x-0.5 items-center mb-1 lg:justify-start justify-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-800">
                This case has a sleek design and provides excellent protection.
                I have had it for over four months, and it still looks as good
                as the day I bought it.
              </p>
            </div>
            <div className="flex justify-between mt-6 items-center">
              <div className="flex items-center gap-x-2 text-sm">
                <Check className="text-primary font-semibold h-4 w-4" />
                <p className="text-gray-900">verified Purchase</p>
              </div>
              <div>
                <p className="text-gray-900 text-sm">20 Jan, 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="text-gray-800 font-semibold md:text-lg mt-24 mb-12 text-md flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-x-1.5">
              <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
              <p className="tracking-wide">High quality, durable material</p>
            </div>
            <div className="flex items-center gap-x-1.5">
              <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
              <p className="tracking-wide">5 year print guarantee</p>
            </div>
            <div className="flex items-center gap-x-1.5">
              <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
              <p className="tracking-wide">Modern iPhone models supported</p>
            </div>
            <div className="flex items-center gap-x-1.5">
              <Check className="text-primary h-5 w-5 shrink-0 font-semibold" />
              <p className="tracking-wide">Scratch and water resistance</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            onClick={() => router.push("/configure/upload")}
            size="sm"
            className="flex mx-auto"
          >
            Create your case
            <ArrowRight />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
