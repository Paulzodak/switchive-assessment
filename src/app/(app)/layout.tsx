"use client";

import { Modal } from "@/components/atoms/Modal";
import { Filter } from "@/components/molecules/filter";
import { selectShowFilter, setShowFilter } from "@/slices/navSlice";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const showFilter = useSelector(selectShowFilter);
  return (
    <div>
      <AnimatePresence>
        {showFilter && (
          <Modal onClose={() => dispatch(setShowFilter(false))}>
            <motion.div
              initial={{ y: 500 }}
              animate={{
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                  // easings:'easeinout'
                },
              }}
              exit={{
                y: 500,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                  // easings:'easeinout'
                },
              }}
              className="bg-white p-4 w-[90vw] max-w-[30rem] max-h-[65vh] rounded-xl shadow-xl relative overflow-y-scroll "
            >
              <div
                onClick={() => dispatch(setShowFilter(false))}
                className="absolute top-4 right-4 bg-blue-950/10 hover:bg-blue-950/30 transition-all rounded-lg p-[3px] cursor-pointer"
              >
                <IoIosClose size={"1.5rem"} />
              </div>
              <Filter />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
