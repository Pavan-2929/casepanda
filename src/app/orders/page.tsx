"use client";

import { useAppSelector } from "@/lib/redux/hook";
import { BASE_PRICE, formatPrice } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user-orders", {
        email: currentUser.email,
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(orders);

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-20 min-h-[80vh]">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          <h1>Your Orders</h1>
        </motion.div>
        <div>
          {orders.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center text-gray-600 p-8"
            >
              <p className="mb-4 text-lg font-semibold">No Orders found</p>
              <Link
                href="/configure/upload "
                className="text-primary underline hover:text-primary-dark"
              >
                Create your case
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-8 mt-6">
              {orders.map((order: any) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1 },
                  }}
                  key={order._id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-wrap justify-between text-sm lg:text-base hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-zinc-800">
                      {order.product?.model.label} Case
                    </p>
                    <p className="text-gray-700">
                      Order ID:{" "}
                      <span className="text-zinc-800">{order._id}</span>
                    </p>
                    <p className="text-gray-700">
                      Order Status:{" "}
                      <span className="text-zinc-800">{order.orderStatus}</span>
                    </p>
                  </div>
                  <div className="space-y-2 mt-2 md:mt-0">
                    <p className="text-gray-700">
                      Total Price:{" "}
                      <span className="text-zinc-800">
                        {formatPrice(
                          BASE_PRICE +
                            order.product.material.price +
                            order.product.finishes.price
                        )}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Ordered on:{" "}
                      <span className="text-zinc-800">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-blue-600 hover:underline">
                      <Link href={`order/${order._id}`}>Explore</Link>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
