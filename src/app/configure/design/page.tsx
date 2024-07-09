"use client";

import { useAppSelector } from "@/lib/redux/hook";
import React, { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NextImage from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/data/caseData";
import { RadioGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_PRICE } from "@/lib/utils";
import { useAppDispatch } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { setProductData } from "@/lib/redux/features/productSlice";
import { motion } from "framer-motion";

const DesignPage = () => {
  const [redirecting, setRedirecting] = useState(false);

  const imageLink = useAppSelector((state: any) => state.image.imageLink);
  const [options, setOptions] = useState({
    colorData: COLORS[0],
    model: MODELS.variants[0],
    material: MATERIALS.variants[0],
    finishes: FINISHES.variants[0],
    image: imageLink,
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setRedirecting(true);
    dispatch(setProductData({ productData: options }));
    router.push("/configure/preview");
  };
  
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 my-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="relative border-2 border-dashed h-[40rem] flex items-center justify-center bg-gray-900/5 border-gray-400"
      >
        <div className="relative w-60 mx-auto">
          <AspectRatio ratio={896 / 1831} className="">
            <NextImage
              src="/phone-template.png"
              alt="Phone-Image"
              fill
              sizes="(max-width: 768px) 100vw, 
           (max-width: 1200px) 50vw, 
           33vw"
              priority
              className="select-none pointer-events-none z-50"
            />
          </AspectRatio>
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
            )}
            style={{ backgroundColor: options.colorData.hex }}
          />
          <div className=" absolute flex items-center  justify-center inset-0 py-1 px-1">
            <img
              src={imageLink}
              alt=""
              className="w-fill  h-full left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="h-[40rem] px-3 md:px-16 mt-10 lg:mt-0"
      >
        <ScrollArea className="h-[35rem]">
          <div className="text-2xl md:text-4xl text-center lg:text-start font-bold">
            <h1>Customize your case</h1>
          </div>
          <div className="border border-gray-300 my-6 w-full lg:w-[80%]" />
          <div>
            <div className="mt-8">
              <RadioGroup
                value={options.colorData.value}
                onChange={(val) =>
                  setOptions((prev: any) => ({
                    ...prev,
                    colorData: COLORS.find((col) => col.value === val),
                  }))
                }
              >
                <Label className="font-semibold text-base text-zinc-800">
                  Color : {options.colorData.label}
                </Label>
                <div className="flex flex-row gap-x-4 mt-2">
                  {COLORS.map((color) => (
                    <RadioGroup.Option
                      key={color.label}
                      value={color.value}
                      className={({ checked }) =>
                        cn(
                          "flex items-center justify-center border-[2px] rounded-full p-0.5 cursor-pointer ",
                          { [color.tw]: checked }
                        )
                      }
                    >
                      <span
                        className="h-8 w-8 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      ></span>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className="mt-7 flex flex-col gap-y-3 justify-between">
              <Label className="font-semibold text-base">Model</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex justify-between px-2 md:px-6 w-full md:w-[70%] border border-zinc-500 outline-none focus:border-none"
                  >
                    {options.model.label}
                    <ChevronsUpDown className="text-zinc-500 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {MODELS.variants.map((model, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn("hover:bg-gray-100 ", {
                        "bg-gray-100": model.label === options.model.label,
                      })}
                      onClick={() =>
                        setOptions((prev: any) => ({
                          ...prev,
                          model,
                        }))
                      }
                    >
                      <div className="flex">
                        {model.label === options.model.label ? (
                          <>
                            {" "}
                            <Check className="text-primary h-4 w-4 " />
                          </>
                        ) : (
                          <>
                            {" "}
                            <Check className="text-primary h-4 w-4 invisible" />
                          </>
                        )}{" "}
                        <p className="ml-6">{model.label}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/*  material section  */}
            <div className="mt-7">
              <Label className="text-base font-semibold">Material</Label>
              <RadioGroup
                value={options.material.value}
                onChange={(val) =>
                  setOptions((prev: any) => ({
                    ...prev,
                    material: MATERIALS.variants.find((m) => m.value === val),
                  }))
                }
                className="flex flex-col space-y-4 mt-3 "
              >
                {MATERIALS.variants.map((material, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={material.value}
                    className={({ checked }) =>
                      cn(
                        "w-full md:w-[70%] border-2 border-gray-300 rounded-lg cursor-pointer",
                        {
                          "border-primary": checked,
                        }
                      )
                    }
                  >
                    <div className="flex justify-between items-center px-2 md:px-6 py-3">
                      <span>
                        <RadioGroup.Label className="text-gray-700 font-semibold">
                          {material.label}
                        </RadioGroup.Label>
                        {material.description ? (
                          <span className="text-sm font-medium text-gray-500 ">
                            {material.description}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-sm font-medium">
                        {formatPrice(material.price)}
                      </span>
                    </div>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>

            {/* FINISHING SECTION */}
            <div className="mt-7">
              <Label className="text-base font-semibold">Finishes</Label>
              <RadioGroup
                value={options.finishes.value}
                onChange={(val) =>
                  setOptions((prev: any) => ({
                    ...prev,
                    finishes: FINISHES.variants.find(
                      (finish) => finish.value === val
                    ),
                  }))
                }
                className="flex flex-col space-y-4 mt-3 "
              >
                {FINISHES.variants.map((finish, index) => (
                  <RadioGroup.Option
                    className={({ checked }) =>
                      cn(
                        "w-full md:w-[70%] border-2 border-gray-300 rounded-lg cursor-pointer",
                        {
                          "border-primary": checked,
                        }
                      )
                    }
                    key={index}
                    value={finish.value}
                  >
                    <div className="flex justify-between items-center px-2 md:px-6 py-3">
                      <span>
                        <RadioGroup.Label className="text-gray-700 font-semibold">
                          {finish.label}
                        </RadioGroup.Label>
                        {finish.description ? (
                          <span className="text-sm font-medium text-gray-500 ">
                            {finish.description}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-sm font-medium">
                        {formatPrice(finish.price)}
                      </span>
                    </div>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>
        <div className="border border-gray-300 mt-8 mb-4 w-full md:w-[70%]" />

        <div className="flex justify-between items-center w-full md:w-[70%]">
          <div>
            <p className="text-base font-semibold text-zinc-900">
              {formatPrice(
                BASE_PRICE + options.finishes.price + options.material.price
              )}
            </p>
          </div>
          <div className="w-full ml-10 font-semibold" onClick={handleSubmit}>
            <Button
              size="sm"
              className="w-full flex gap-x-2 text-sm justify-center "
            >
              {redirecting ? (
                <div className="flex gap-x-2 justify-center items-center">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                </div>
              ) : (
                <div>Continue</div>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DesignPage;
