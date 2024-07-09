"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { useAppSelector } from "@/lib/redux/hook";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BASE_PRICE, cn, formatPrice } from "@/lib/utils";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PreviewPage = () => {
  const [redirecting, setRedirecting] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>({});
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const router = useRouter();

  const imageLink = useAppSelector((state: any) => state.image.imageLink);
  const productData = useAppSelector((state: any) => state.product.productData);
  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  console.log(currentUser);

  const handleOrder = async (e: any) => {
    if (currentUser.address === null) {
      toggleModal();
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/order-create", {
        user: currentUser,
        product: productData,
        paymentType,
        totalPrice:
          BASE_PRICE + productData.material.price + productData.finishes.price,
      });
      setOrder(response.data.order);
      console.log(response);
      if (paymentType === "cash") {
        toast({
          title: "success",
          description:
            "Your order has confirmed | keep track your of your order",
        });
        setRedirecting(true);
        router.push(`/order/${response.data.order._id}`);

        setLoading(false);
      } else {
        makePayment(response.data.order._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (id: any) => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OyWA4SFcBAtTqX509oQ5XfWYIDR7Nb42szVuKyXECHbvZQRZ2yqLDmjt4iU6iH6R3b2HmSDmYEzKb5TV6yRgVKD003cIwgXts"
      );

      const response = await axios.post("/api/create-checkout-session", {
        user: currentUser,
        product: productData,
        id,
      });

      console.log();

      const session = response.data;

      setRedirecting(true);
      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: "Failed to make payment",
      });
    } finally {
      setLoading(false);
    }
  };

  if (redirecting) {
    return (
      <div className="flex justify-center items-center my-20 min-h-[80vh] gap-x-2 text-xl font-semibold">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
        Redirecting | Please wait
      </div>
    );
  }

  return (
    <div className="my-16">
      <div className="grid lg:grid-cols-3 grid-cols-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className="relative col-span-1 w-60 mx-auto h-[31rem]"
        >
          <AspectRatio ratio={896 / 1831}>
            <NextImage
              src="/phone-template.png"
              fill
              sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
              priority
              alt="phoneImage"
              className="z-50 pointer-events-none select-none"
            />
          </AspectRatio>
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
            )}
            style={{ backgroundColor: productData.colorData.hex }}
          />
          <div className="absolute inset-0 pb-2 flex justify-center px-1 items-center">
            <img
              src={imageLink}
              className="w-full h-full left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
              alt="image"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className="col-span-2 md:border-l-2 border-gray-300 mt-14 lg:mt-0"
        >
          <div className="px-6">
            <div className="text-4xl font-bold">
              <p>Your {productData.model.label} case</p>
            </div>
            <div className="mt-6 space-y-1">
              <div className="flex items-center gap-x-2">
                <Check className="h-5 w-5 text-primary font-semibold" />
                <p className="text-base font-medium">
                  In stock | ready to ship
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <Check className="h-5 w-5 text-primary font-semibold" />
                <p className="text-base font-medium">Delivery with in 7 days</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between md:flex-row flex-col space-y-8">
              <div>
                <Label className="text-lg font-semibold">Highlights</Label>
                <ul className="list-inside  list-disc mt-3 tracking-wide text-base space-y-0.5 font-medium text-gray-700">
                  <li>Wireless charging support</li>
                  <li>TPU Shock absobtion</li>
                  <li>Eco-firendly packaging-production</li>
                  <li>2 Years print warranty</li>
                </ul>
              </div>
              <div>
                <Label className="text-lg font-semibold">Materials</Label>
                <ul className="list-inside list-disc mt-3 tracking-wide text-base space-y-0.5 font-medium text-gray-700">
                  <li>High-quality, durable material</li>
                  <li>Scratch- and fingerprint resistant coating</li>
                </ul>
              </div>
            </div>
            <div className="border border-gray-300 mt-10 mb-6" />
            <div className="space-y-1 mx-6 border-b-2 border-gray-300 pb-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-gray-800">
                  Base price
                </p>
                <p className="text-[15px] font-semibold text-zinc-700">
                  {formatPrice(BASE_PRICE)}
                </p>
              </div>
              {productData.material.value === "polycarbonate" ? (
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-800">
                    Base price
                  </p>
                  <p className="text-[15px] font-semibold text-zinc-700">
                    {formatPrice(productData.material.price)}
                  </p>
                </div>
              ) : null}
              {productData.finishes.value === "textured" ? (
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-800">
                    Base price
                  </p>
                  <p className="text-[15px] font-semibold text-zinc-700">
                    {formatPrice(productData.finishes.price)}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex justify-between items-center mx-6 mt-4">
              <p className="font-medium text-zinc-900">Total Price</p>
              <p className="font-semibold text-zinc-800">
                {formatPrice(
                  BASE_PRICE +
                    productData.material.price +
                    productData.finishes.price
                )}
              </p>
            </div>
            <div className="mt-12 lg:mt-6 flex flex-col items-center lg:items-start lg:mx-6">
              <Label className="text-lg font-semibold">Payment Type</Label>
              <div className="flex gap-x-4 mt-2">
                <label className="flex items-center gap-x-1">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentType === "cash"}
                    onChange={() => setPaymentType("cash")}
                  />
                  <span>Cash</span>
                </label>
                <label className="flex items-center gap-x-1">
                  <input
                    type="radio"
                    value="payment"
                    checked={paymentType === "online"}
                    onChange={() => setPaymentType("online")}
                  />
                  <span>Online</span>
                </label>
              </div>
            </div>
            <div>
              <Button
                size="sm"
                className="w-fit lg:ml-auto mx-auto px-6 lg:mr-6 flex gap-x-2 text-sm justify-center mt-8"
                type="submit"
                onClick={handleOrder}
              >
                {loading ? (
                  <div className="flex gap-x-2 justify-center items-center">
                    <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                  </div>
                ) : (
                  <div className="flex font-semibold gap-x-2 justify-center items-center">
                    <p>CheckOut</p>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
        {modal ? (
          <>
            {" "}
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-gray-100 p-6 md:p-10 rounded-lg shadow-lg md:w-[40vw] w-full">
                <div className="flex flex-col justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Please fill the address details before checkout
                  </h2>
                  <p className="text-lg font-medium mt-4 text-zinc-600">
                    Do not worry your data is safe
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button onClick={() => router.push("/profile")}>
                    Redirect
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PreviewPage;
