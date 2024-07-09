"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_PRICE, formatPrice } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminOrders from "./AdminOrders";
import ModelChart from "./charts/ModelChart";
import OrderStatus from "./charts/OrderStatus";
import AdminUsers from "./AdminUsers";
import PieChartComponent from "./charts/PieChart";
import MaterialChart from "./charts/MaterialChart";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";

const AdminPage = () => {
  const ScrollTriggerAny = ScrollTrigger as any;

  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [users, setUsers] = useState([]);

  const [colorsLength, setColorsLength] = useState([
    { name: "Black", value: 0 },
    { name: "Red", value: 0 },
    { name: "Blue", value: 0 },
  ]);

  const [modelLength, setModelLength] = useState([
    { name: "iPhone X", value: 0 },
    { name: "iphone 11", value: 0 },
    { name: "iPhone 12", value: 0 },
    { name: "iPhone 13", value: 0 },
    { name: "iPhone 14", value: 0 },
    { name: "iPhone 15", value: 0 },
  ]);

  const [deliveryStatus, setDeliveryStatus] = useState([
    { name: "Pending", value: 0 },
    { name: "Confirmed", value: 0 },
    { name: "Shipped", value: 0 },
    { name: "Delivered", value: 0 },
  ]);

  const [variants, setVariants] = useState({
    silicone: 0,
    polycarbonate: 0,
    smooth: 0,
    textured: 0,
  });

  const [materials, setMaterials] = useState([
    { name: "silicone", value: 0 },
    { name: "polycarbonate", value: 0 },
  ]);

  const [finishes, setFinishes] = useState([
    {
      name: "smooth",
      value: 0,
    },
    {
      name: "textured",
      value: 0,
    },
  ]);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/orders", {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
          calculateRevenue(ordersData);
          calulateColor(ordersData);
          calculateModel(ordersData);
          calulateDeliveryStatus(ordersData);
          calculateVariants(ordersData);
        } else {
          console.error("Failed to fetch orders data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateVariants = (orders: any) => {
    const variantsCount = {
      silicone: 0,
      polycarbonate: 0,
      smooth: 0,
      textured: 0,
    };

    const materialCount = [
      { name: "silicone", value: 0 },
      { name: "polycarbonate", value: 0 },
    ];

    const finishCount = [
      {
        name: "smooth",
        value: 0,
      },
      {
        name: "textured",
        value: 0,
      },
    ];

    orders.forEach((order: any) => {
      if (order.product.material.value === "silicone") {
        variantsCount.silicone += 1;
        materialCount[0].value += 1;
      }
      if (order.product.material.value === "polycarbonate") {
        variantsCount.polycarbonate += 1;
        materialCount[1].value += 1;
      }

      if (order.product.finishes.value === "smooth") {
        variantsCount.smooth += 1;
        finishCount[0].value += 1;
      }
      if (order.product.finishes.value === "textured") {
        variantsCount.textured += 1;
        finishCount[1].value += 1;
      }
    });

    setVariants(variantsCount);
    setMaterials(materialCount);
    setFinishes(finishCount);
  };

  const calulateDeliveryStatus = (orders: any) => {
    const deliveryStatusCount = [
      { name: "Pending", value: 0 },
      { name: "Confirmed", value: 0 },
      { name: "Shipped", value: 0 },
      { name: "Delivered", value: 0 },
    ];

    orders.forEach((order: any) => {
      deliveryStatusCount.forEach((status: any) => {
        if (order.orderStatus === status.name) {
          status.value += 1;
        }
      });
    });

    setDeliveryStatus(deliveryStatusCount);
  };

  const calculateModel = (orders: any) => {
    const modelCount = [
      { name: "iPhone X", value: 0 },
      { name: "iPhone 11", value: 0 },
      { name: "iPhone 12", value: 0 },
      { name: "iPhone 13", value: 0 },
      { name: "iPhone 14", value: 0 },
      { name: "iPhone 15", value: 0 },
    ];

    orders.forEach((order: any) => {
      if (order.product.model.label === "iPhone X") {
        modelCount[0].value += 1;
      } else if (order.product.model.label === "iPhone 11") {
        modelCount[1].value += 1;
      } else if (order.product.model.label === "iPhone 12") {
        modelCount[2].value += 1;
      } else if (order.product.model.label === "iPhone 13") {
        modelCount[3].value += 1;
      } else if (order.product.model.label === "iPhone 14") {
        modelCount[4].value += 1;
      } else if (order.product.model.label === "iPhone 15") {
        modelCount[5].value += 1;
      }
    });

    setModelLength(modelCount);
  };

  const calulateColor = (orders: any) => {
    const colorsCount = [
      { name: "Black", value: 0 },
      { name: "Red", value: 0 },
      { name: "Blue", value: 0 },
    ];

    orders.forEach((order: any) => {
      if (order.product.colorData.label === "Black") {
        colorsCount[0].value += 1;
      } else if (order.product.colorData.label === "Blue") {
        colorsCount[2].value += 1;
      } else if (order.product.colorData.label === "Red") {
        colorsCount[1].value += 1;
      }
    });

    setColorsLength(colorsCount);
  };

  const fetchUsers = async () => {
    setLoading(true); // Indicate loading state
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = (orders: any) => {
    if (orders) {
      const total = orders.reduce((acc: number, order: any) => {
        const materialPrice = order?.product.material.price || 0;
        const finishesPrice = order?.product.finishes.price || 0;
        return acc + BASE_PRICE + materialPrice + finishesPrice;
      }, 0);
      setTotalRevenue(total);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (currentUser.email !== "casepanda29@gmail.com") {
    router.push("/");
  }

  const [upperCounter, setUpperCounter] = useState(false);
  const [lowerCounter, setLowerCounter] = useState(false);

  console.log(orders);

  if (loading) {
    return (
      <div className="flex justify-center my-20 min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl lg:block hidden mx-auto px-4 lg:px-12 my-10">
        <div>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-semibold mb-8 text-gray-900"
          >
            Dashboard
          </motion.h1>
          <ScrollTriggerAny
            onEnter={() => setUpperCounter(true)}
            onExit={() => setUpperCounter(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">
                  Total Revenue
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  ₹
                  {upperCounter && (
                    <CountUp start={0} end={totalRevenue} delay={1} />
                  )}{" "}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">
                  Registered Users
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {upperCounter && (
                    <CountUp start={0} end={users?.length} delay={1} />
                  )}{" "}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">Sales</h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {upperCounter && (
                    <CountUp start={0} end={orders?.length} delay={1} />
                  )}{" "}
                </p>
              </motion.div>
            </div>
          </ScrollTriggerAny>
          <div className="flex mt-24 justify-between items-center">
            <div className="h-full w-[48%]">
              <OrderStatus deliveryStatus={deliveryStatus} />
              <p className="text-xl text-center ml-10 font-semibold text-primary mt-8">
                Delivery Status Chart
              </p>
            </div>
            <div className="max-w-[50%]">
              <ScrollArea className="h-[90vh] border border-gray-500 rounded-lg px-8 py-6">
                {orders.length === 0 ? (
                  <div className="text-center text-gray-600">
                    <p>No Orders found</p>
                  </div>
                ) : (
                  <AdminOrders orders={orders} />
                )}
              </ScrollArea>
            </div>
          </div>
          <div className="border border-gray-300 my-20" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[90%] mx-auto h-[40vh]/"
          >
            <ModelChart modelLength={modelLength} />
            <p className="text-center text-xl mt-6 font-semibold text-primary">
              Colors Chart
            </p>
          </motion.div>
          <div className="border border-gray-300 my-20" />
          <ScrollTriggerAny
            onEnter={() => setLowerCounter(true)}
            onExit={() => setLowerCounter(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">
                  Silicone Mateerial
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {lowerCounter && (
                    <CountUp start={0} end={variants.silicone} delay={1} />
                  )}{" "}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">
                  PolyCarbonets
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {lowerCounter && (
                    <CountUp start={0} end={variants.polycarbonate} delay={1} />
                  )}{" "}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">Smooth</h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {lowerCounter && (
                    <CountUp start={0} end={variants.smooth} delay={1} />
                  )}{" "}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white rounded-lg text-center border border-gray-500"
              >
                <h2 className="text-lg font-semibold text-gray-600">
                  Textured
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-3">
                  {lowerCounter && (
                    <CountUp start={0} end={variants.textured} delay={1} />
                  )}
                </p>
              </motion.div>
            </div>
          </ScrollTriggerAny>
          <div className="mt-20 flex justify-between">
            <div className="w-[48%]">
              <ScrollArea className="h-[100vh] border border-gray-500 rounded-lg px-8 py-6">
                {users.length === 0 ? (
                  <div className="text-center text-gray-600">
                    <p>No Users found</p>
                  </div>
                ) : (
                  <AdminUsers users={users} />
                )}
              </ScrollArea>
            </div>
            <div className="w-[50%] mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center justify-center mx-auto "
              >
                <PieChartComponent colorsLength={colorsLength} />
                <p className="text-center text-base -mt-6 font-semibold text-primary">
                  Colors Chart
                </p>
              </motion.div>
              <div className="mt-20">
                <div className="grid grid-cols-2">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <MaterialChart materials={materials} />
                    <p className="text-center text-base font-semibold text-primary">
                      Material Chart
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <MaterialChart materials={finishes} />
                    <p className="text-center text-base font-semibold text-primary">
                      Finishes Chart
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden block">
        <div className="flex items-center justify-center text-xl font-semibold">
          <h1>
            You can not access admin page into smaller screen | Use Computer
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
