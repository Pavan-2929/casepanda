import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const Phone = ({ imgSrc, className, ...props }: PhoneProps) => {
  return (
    <div
      className={cn("relative pointer-events-none select-none z-50", className)}
      {...props}
    >
      <img
        src="/phone-template-white-edges.png"
        alt="phone-image"
        className="pointer-events-none select-none z-50"
      />
      <div className="absolute -z-10 inset-0">
        <img src={imgSrc} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Phone;
