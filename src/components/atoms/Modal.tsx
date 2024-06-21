import * as React from "react";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
interface IModalProps {
  header?: string;
  content?: React.ReactNode;
  onClose: Function;
  show?: boolean;
  customJsx?: React.ReactNode;
  children: React.ReactNode;
}

export function Modal({
  header,
  customJsx,
  content,
  onClose,
  children,
}: IModalProps) {
  return (
    <div className="fixed z-20 w-screen h-screen overflow-hidden top-0 left-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onClose()}
        className="absolute h-full w-full !backdrop-brightness-50 top-0 left-0 z-20 dim_backdrop bg-reds-200"
      ></motion.div>

      <motion.div className="z-30">{children}</motion.div>
    </div>
  );
}
