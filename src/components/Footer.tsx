"use client"

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-100"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl border-t border-gray-300 mx-auto text-gray-500 font-medium flex lg:flex-row flex-col justify-between px-2 lg:px-6 py-6 items-center"
      >
        <div>
          <p className="text-center lg:text-start">
            @ 2024 Casepanda, Inc. All rights reserved.
          </p>
        </div>
        <div className="flex justify-around gap-x-6 text-sm mt-6 lg:mt-0">
          <p>Terms</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
