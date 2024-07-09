"use client";

import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/lib/redux/hook";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";
import NextImage from "next/image";
import { BASE_PRICE, cn, formatPrice } from "@/lib/utils";

const PaymentSuccess = () => {
  const productData = useAppSelector((state: any) => state.product.productData);
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  return (
    <div className="max-w-7xl my-12 mx-auto px-3 lg:px-12">
      <div className="text-4xl font-bold  text-center">
        <h1>Your payment has successful</h1>
      </div>
      <div className="px-8 py-8 mt-8 bg-gray-100 grid grid-cols-3">
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
              style={{ backgroundColor: productData.colorData.hex }}
            />
            <div className="absolute inset-0 pb-2 flex justify-center px-1 items-center">
              <img
                src={productData.image}
                className="w-full h-full left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
                alt="image"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <li className="text-lg font-semibold list-disc list-inside">
            Order details
          </li>
          <div className="flex justify-between border-b-2 border-gray-300 pb-4">
            <div className="p-4 space-y-2 mt-2">
              <p className="text-gray-700 font-semibold">
                Case color:{" "}
                <span className="text-gray-900">
                  {productData.colorData.label}
                </span>
              </p>
              <p className="text-gray-700 font-semibold">
                Case model:{" "}
                <span className="text-gray-900">{productData.model.label}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Material:{" "}
                <span className="text-gray-900">
                  {productData.material.label}
                </span>
              </p>
              <p className="text-gray-700 font-semibold">
                Finishes:{" "}
                <span className="text-gray-900">
                  {productData.finishes.label}
                </span>
              </p>
            </div>
            <div className="p-4 space-y-2 mt-6  mr-24">
              <p className="text-gray-700 font-semibold">
                Payment: <span className="text-gray-900">Completed</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Delivery Status: <span className="text-gray-900">Pending</span>
              </p>
            </div>
          </div>
          <li className="text-lg font-semibold list-disc list-inside mt-6  ">
            Address details
          </li>
          <div className="p-4 space-y-1 mt-2 font-semibold text-gray-700">
            <p>
              {currentUser.address.street}, {currentUser.address.area}
            </p>
            <p>
              {currentUser.address.city}, {currentUser.address.state}
            </p>
            <p>{currentUser.address.pincode}</p>
          </div>
          <li className="text-base font-semibold list-disc list-inside mt-3  ">
            Total-Cost:{" "}
            {formatPrice(
              BASE_PRICE +
                productData.material.price +
                productData.finishes.price
            )}
          </li>
          <div className="mt-6">
            <Label className="text-base font-semibold">
              Thank you for your order! We will contact you shortly for
              delivery.
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
