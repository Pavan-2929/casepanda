"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_PRICE, formatPrice } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminUserPage = ({ params }: any) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: {
      phone: "",
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/user", { id: params.id });

      setUser(response.data.user);

      const orderResponse = await axios.post("/api/user-orders", {
        email: response.data.user.email,
      });

      setOrders(orderResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-20 min-h-[80vh]">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  return (
    <div className=" h-full mx-auto flex items-center justify-between max-w-7xl px-3 lg:px-12 py-20">
      <div className="bg-zinc-50 px-4 sm:px-14 shadow-md py-8 max-w-lg border border-gray-300 h-[80vh]">
        <div className="text-2xl font-semibold text-center text-primary">
          <h1>User Information</h1>
        </div>
        <div className="flex items-center justify-between gap-x-2 md:gap-x-10 border-b-2 border-gray-300 ">
          <div>
            <img
              src="/user.png"
              alt="userimage"
              className="w-40 h-40 object-contain"
            />
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <Input value={user.username} readOnly />
            <Input value={user.email} readOnly />
          </div>
        </div>
        <div className="space-y-6 mt-10">
          <Input
            name="phone"
            value={user.address?.phone}
            placeholder="Phone"
            readOnly
          />
          <Input
            name="street"
            value={user.address?.street}
            placeholder="Street"
            readOnly
          />
          <div className="flex gap-x-4">
            <Input
              name="area"
              value={user.address?.area}
              placeholder="Area"
              readOnly
            />
            <Input
              name="city"
              value={user.address?.city}
              placeholder="City"
              readOnly
            />
          </div>
          <div className="flex gap-x-4">
            <Input
              name="state"
              value={user.address?.state}
              placeholder="State"
              readOnly
            />
            <Input
              name="pincode"
              value={user.address?.pincode}
              placeholder="Pincode"
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <ScrollArea className="h-[80vh] border border-gray-300 bg-gray-50 py-8 px-6">
          <div className="text-2xl font-semibold text-center text-primary">
            <h1>Users Orders</h1>
          </div>
          <div className="min-w-full">
            {orders.length === 0 ? (
              <div className="text-center text-gray-600">
                <p>No Orders found</p>
              </div>
            ) : (
              <div className="space-y-8 mt-6 ">
                {orders.map((order: any) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-wrap justify-between text-sm lg:text-base hover:shadow-lg transition-shadow"
                  >
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-zinc-800">
                        {order.product?.model.label} Case
                      </p>
                      <p className="text-gray-700">
                        Order Status:{" "}
                        <span className="text-zinc-800">
                          {order.orderStatus}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2 mt-2 md:mt-0 flex flex-col justify-between">
                      <p className="text-zinc-800">
                        {formatPrice(
                          BASE_PRICE +
                            order.product.material.price +
                            order.product.finishes.price
                        )}
                      </p>
                      <p className="text-blue-600 hover:underline text-end">
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/admin/order/${order._id}`)
                          }
                        >
                          Explore
                        </p>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminUserPage;
