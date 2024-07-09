import React from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const AdminUsers = ({ users }: { users: any }) => {
  const router = useRouter();
  return (
    <div className="space-y-8 mt-6">
      {users.map((user: any) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1 },
          }}
          key={user._id}
          onClick={() => router.push(`/admin/user/${user._id}`)}
          className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex space-x-10 flex-wrap justify-between text-sm lg:text-base hover:shadow-lg transition-shadow"
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">
              {user.username}
            </p>
            <p>{user.email}</p>
          </div>
          <div className="space-y-2 flex flex-col justify-between">
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            <p className="flex gap-x-1 items-center text-gray-500 text-sm font-medium">
              <Check className="h-3 w-3 text-primary" /> verified
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminUsers;
