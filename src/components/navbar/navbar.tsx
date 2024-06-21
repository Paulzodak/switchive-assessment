import * as React from "react";
import { FaUser } from "react-icons/fa";
interface INavbarProps {}

export function Navbar(props: INavbarProps) {
  return (
    <div className="flex justify-between  p-4 font-lato bg-gray-100">
      <h1 className=" font-semibold text-blue-950 sm:text-2xl ">SHOPPY</h1>
      <FaUser className="my-auto " color="rgb(23 37 84)" />
    </div>
  );
}
