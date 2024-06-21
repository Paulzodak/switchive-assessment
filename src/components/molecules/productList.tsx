import { useCapitalizeFirstLetter } from "@/hooks/useCapitalizeFirstLetter";
import { selectProducts, selectSelectedCategory } from "@/slices/productSlice";
import { IProduct } from "@/types/types";
import * as React from "react";
import { useSelector } from "react-redux";
import { Product } from "../atoms/product";
import { AnimatePresence, animate, motion } from "framer-motion";
import { containerVariants2, itemVariants2 } from "@/lib/framerConfig";

export interface IProductListProps {}

export function ProductList(props: IProductListProps) {
  const products = useSelector(selectProducts);
  const selectedCategory = useSelector(selectSelectedCategory);
  const categoryName = useCapitalizeFirstLetter(
    selectedCategory ? selectedCategory : ""
  );
  return (
    <div className="mt-6">
      {selectedCategory && (
        <h1 className="text-xl font-semibold">
          {categoryName} ({products?.length})
        </h1>
      )}
      {!selectedCategory && (
        <h1 className="text-xl font-semibold">All Products (100+)</h1>
      )}
      {/* <AnimatePresence> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { staggerChildren: 0.5, ease: "easeInOut", delay: 0.7 },
        }}
        exit={{ opacity: 0 }}
        // variants={containerVariants2}
        // initial="hidden"
        // animate="visible"
        // exit="hidden"
        className="mt-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  gap-x-4 gap-y-6"
      >
        {products.map((product: IProduct, i: number) => {
          return <Product key={product.title} product={product} />;
        })}
      </motion.div>
      {/* </AnimatePresence> */}
    </div>
  );
}
