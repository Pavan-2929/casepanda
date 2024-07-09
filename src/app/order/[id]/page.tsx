"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { BASE_PRICE, cn, formatPrice } from "@/lib/utils";
import { CircleCheckBig, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const OrderIdPage = ({ params }: any) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>({});

  const router = useRouter();

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/order-find-orderId`, {
        id: params.id,
      });
      setOrder(response.data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-20 min-h-[70vh]">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  const deliveryStatusData = ["Pending", "Confirmed", "Shipped", "Delivered"];

  return (
    <div className="max-w-7xl my-12 mx-auto px-3 lg:px-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:grid grid-cols-4 ml-28"
      >
        {order &&
          deliveryStatusData.map((status, index) => {
            const currentStaus = order.orderStatus;

            const isCompleted = deliveryStatusData
              .slice(index + 1)
              .some((status) => status === order.orderStatus);

            console.log(currentStaus);

            return (
              <div key={index} className="flex gap-x-2">
                <CircleCheckBig
                  className={cn("text-gray-600 ml-2", {
                    "text-primary": isCompleted,
                    "text-zinc-800": status === order.orderStatus,
                  })}
                />
                <p
                  className={cn("text-zinc-500 font-semibold", {
                    "text-primary": isCompleted,
                    "text-zinc-950": status === currentStaus,
                  })}
                >
                  {status}
                </p>
                {index < deliveryStatusData.length - 1 && (
                  <div
                    className={cn(
                      "border-t-[3px] my-auto flex-grow border-gray-600",
                      {
                        "border-t-[3px] border-primary": isCompleted,
                        "border-t-[3px] border-zinc-700":
                          status === order.orderStatus,
                      }
                    )}
                  />
                )}
              </div>
            );
          })}
      </motion.div>
      <div className="lg:px-8 px-2 py-8 mt-8 grid lg:grid-cols-3 grid-cols-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className="col-span-1 mx-auto"
        >
          <div className="relative w-60 h-[31rem]">
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
              style={{ backgroundColor: order.product?.colorData.hex }}
            />
            <div className="absolute inset-0 pb-2 flex justify-center px-1 items-center">
              <img
                src={order.product?.image}
                className="w-full h-full left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
                alt="image"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className="col-span-2 mt-6 lg:mt-0"
        >
          <li className="text-xl font-bold text-gray-800 list-disc list-inside">
            Order details
          </li>
          <div className="md:flex md:justify-between border-b border-gray-200 pb-6">
            <div className="lg:p-6 space-y-3 mt-3">
              <p className="text-gray-600 font-medium">
                Case color:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.product?.colorData.label}
                </span>
              </p>
              <p className="text-gray-600 font-medium">
                Case model:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.product?.model.label}
                </span>
              </p>
              <p className="text-gray-600 font-medium">
                Material:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.product?.material.label}
                </span>
              </p>
              <p className="text-gray-600 font-medium">
                Finishes:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.product?.finishes.label}
                </span>
              </p>
            </div>
            <div className="mt-3 lg:p-6 lg:mt-0 flex flex-col space-y-2 lg:mr-24">
              <div className="text-gray-600 font-medium mb-3 flex items-center gap-x-2">
                Payment:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.paymentType === "cash" ? (
                    <p>Pending</p>
                  ) : (
                    <p>Completed</p>
                  )}
                </span>
              </div>
              <div className="max-w-[200px]">
                <p className="text-gray-600 font-medium mb-3">
                  Order-Status:{" "}
                  <span className="text-gray-800 font-semibold">
                    {order.orderStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <li className="text-xl font-bold text-gray-800 list-disc list-inside mt-6">
            Address details
          </li>
          <div className="p-6 space-y-2 mt-3 font-medium text-gray-600 relative">
            <p>
              {order.user?.address.street}, {order.user?.address.area}
            </p>
            <p>
              {order.user?.address.city}, {order.user?.address.state}
            </p>
            <p>{order.user?.address.pincode}</p>
            <div className="absolute -top-20 right-20 hidden xl:block">
              <img src="/panda1.png" alt="" className="w-64 h-64"/>
            </div>
          </div>
          <li className="text-lg font-bold text-gray-800 list-disc list-inside mt-3">
            Total Cost:{" "}
            {formatPrice(
              BASE_PRICE +
                order.product?.material.price +
                order.product?.finishes.price
            )}
          </li>
          <div className="mt-6">
            <p
              onClick={() => router.push("/orders")}
              className="text-base font-semibold cursor-pointer text-primary underline underline-offset-4 lg:px-6 text-center lg:text-start transition duration-300"
            >
              Your orders
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderIdPage;
