import { IProduct } from "@/types/types";
import Image from "next/image";
import * as React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { itemVariants2 } from "@/lib/framerConfig";
import { Button } from "../shadcn/button";
interface IProductProps {
  product: IProduct;
}

export function Product({ product }: IProductProps) {
  return (
    <motion.div
      variants={itemVariants2}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <div className="relative w-full aspect-[9/16]  shadow-md">
        <Image
          src={product.images[0]}
          alt="product_image"
          fill
          objectFit="cover"
        />
        <div className="absolute backdrop-brightness-50  z-10 top-0 left-0 w-full h-full"></div>
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
        <Button className="border border-blue-950 !text-blue-950 py-1 w-full mt-4 !rounded-none">
          Add To Cart
        </Button>
      </div>
    </motion.div>
  );
}
