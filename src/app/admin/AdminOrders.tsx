import React from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const AdminOrders = ({ orders }: { orders: any }) => {
  const router = useRouter();
  return (
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
          onClick={() => router.push(`admin/order/${order._id}`)}
          className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex space-x-10 flex-wrap justify-between text-sm lg:text-base hover:shadow-lg transition-shadow"
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">
              {order.product?.model.label} Case
            </p>
            <p>{order.user.email}</p>
          </div>
          <div className="space-y-2 flex flex-col justify-between">
            <p className="flex items-center font-semibold text-end justify-end  ">
              <span>{<Plus size={16} />} </span> {formatPrice(order.totalPrice)}
            </p>
            <p className="text-gary-700">Order-status: {order.orderStatus}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminOrders;
