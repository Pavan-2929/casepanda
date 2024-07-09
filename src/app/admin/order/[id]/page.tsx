"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { BASE_PRICE, cn, formatPrice } from "@/lib/utils";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const AdminOrderPage = ({ params }: any) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>({});
  const [deliveryStatus, setDeliveryStatus] = useState<string>("");

  const router = useRouter();

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/order-find-orderId`, {
        id: params.id,
      });
      setOrder(response.data.order);
      console.log(response.data.orderStatus);

      setDeliveryStatus(response.data.order.orderStatus);
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
      <div className="flex justify-center my-20 min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  console.log(deliveryStatus);

  const deliveryStatusData = ["Pending", "Confirmed", "Shipped", "Delivered"];

  const handleStatus = async (status: string) => {
    setDeliveryStatus(status);
    try {
      const response = await axios.post("/api/change-order-status", {
        orderId: params.id,
        orderStatus: status,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleback = () => {
    router.back();
  };
  

  return (
    <div className="max-w-7xl my-12 mx-auto px-3 lg:px-12">
      <div className="lg:px-8 px-2 py-8 mt-8 grid lg:grid-cols-3 grid-cols-1">
        <div className="col-span-1 mx-auto">
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
        </div>
        <div className="col-span-2 mt-6 lg:mt-0">
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
            <div className="mt-3 lg:p-6 lg:mt-0 flex flex-col justify-between lg:mr-24">
              <p className="text-gray-600 font-medium mb-3">
                Payment:{" "}
                <span className="text-gray-800 font-semibold">Completed</span>
              </p>
              <div className="max-w-[200px]">
                <DropdownMenu>
                  <p className="text-gray-600 font-medium mb-1">Order status</p>
                  <DropdownMenuTrigger asChild>
                    <div className="flex justify-between items-center px-2 md:px-6 w-full border bg-white rounded-md py-2 text-sm font-medium border-zinc-500">
                      {deliveryStatus}
                      <ChevronsUpDown className="text-zinc-500 h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {deliveryStatusData.map((status) => (
                      <DropdownMenuItem
                        onClick={() => handleStatus(status)}
                        key={status}
                        className="px-4 py-2 hover:bg-blue-100"
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <li className="text-xl font-bold text-gray-800 list-disc list-inside mt-6">
            Address details
          </li>
          <div className="p-6 space-y-2 mt-3 font-medium text-gray-600">
            <p>
              {order.user?.address.street}, {order.user?.address.area}
            </p>
            <p>
              {order.user?.address.city}, {order.user?.address.state}
            </p>
            <p>{order.user?.address.pincode}</p>
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
              className="text-base font-semibold cursor-pointer text-primary underline underline-offset-4 lg:px-6 text-center lg:text-start transition duration-300"
              onClick={handleback}
            >
              back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderPage;
