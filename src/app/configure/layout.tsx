import Steps from "@/components/Steps";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-3 lg:px-12">
      <Steps />
      {children}
    </div>
  );
};

export default layout;
