import { IProduct } from "@/types/types";
import Image from "next/image";
import * as React from "react";
import { CiStar } from "react-icons/ci";
import { FaEye, FaRegHeart, FaStar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "../shadcn/button";
import { IoHeart } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
interface IProductProps {
  product: IProduct;
}

export function Product({ product }: IProductProps) {
  const [showDetails, setShowDetails] = React.useState<boolean>(false);
  return (
    <motion.div
      className="h-full  relative"
      whileHover={{
        scale: 1.05,
        transition: { ease: "easeInOut", duration: 0.4 },
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <div
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        className="relative w-full aspect-[9/16] overflow-hidden   "
      >
        <div className="absolute top-[5px] z-10 right-2 bg-blue-950/10 hover:bg-blue-950/30 transition-all rounded-full p-[6px] cursor-pointer">
          <IoHeart size={"1.3rem"} />
        </div>
        <Image
          loading="lazy"
          src={product.images[0]}
          alt="product_image"
          fill
          objectFit="cover"
          className=" backdrop-brightness-95 dim_backdrop2 "
        />
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ y: "100%" }}
              exit={{
                y: "100%",
                transition: { ease: "easeInOut", duration: 0.8 },
              }}
              animate={{ y: "0%", transition: { ease: "easeInOut" } }}
              className="absolute  backdrop-brightness-50 dim_backdrop   z-10 top-0 left-0 w-full h-full p-2"
            >
              <div className="relative w-full  h-full top-0 left-0 text-xs">
                <div className="bg-white text-black absolute top-0 left-0 py-2 px-3 font-medium cursor-pointer">
                  SALE!
                </div>
                <div className="grid grid-rows-3 gap-2 absolute top-0 right-0">
                  <div className="bg-white text-black p-[10px] cursor-pointer">
                    <FaEye />
                  </div>
                  <div className="bg-white text-black p-[10px] cursor-pointer">
                    <FaRegHeart />
                  </div>
                  <div className="bg-white text-black p-[10px] cursor-pointer">
                    <MdCompareArrows />
                  </div>
                </div>
                <Button className="borsder absolute bottom-0 border-white !bg-white !text-black py-1 w-full mt-4 !rounded-none  mb-0 !text-xs">
                  Add To Cart
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 text-xs text-black ">
        <div className="flex justify-between">
          <h1 className="truncate text-wrap">{product.title}</h1>
          <div className="flex">
            {/* <div className="border w-4 my-auto" /> */}
            <div className="text-nowrap font-semibold text-[14px]">
              $ {product.price}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <div className="flex gap-2 items-center">
            {new Array(Number(product.rating.toFixed()))
              .fill(1)
              .concat(2, 2, 2, 2)
              .map((item, i) => {
                if (i >= 5) {
                  return;
                } else if (item == 1) {
                  return <FaStar key={i} size="0.9rem" color="#F6B01E" />;
                } else if (item == 2) {
                  return <CiStar key={i} size="0.9rem" color="#878787" />;
                }
              })}
          </div>
          <p className="text-sm">{Number(product.rating.toFixed())}.0</p>
        </div>
        {/* <Button className="border border-blue-950 !text-blue-950 py-1 w-full mt-4 !rounded-none relative mb-0">
          Add To Cart
        </Button> */}
      </div>
    </motion.div>
  );
}
