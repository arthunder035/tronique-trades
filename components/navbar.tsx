"use client";
import { useRoot } from "@/context/ContextProvider";
import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { HiCog } from "react-icons/hi";
import { FaCaretRight, FaClockRotateLeft } from "react-icons/fa6";
import icon from "../public/icon.svg";
import Image from "next/image";
import logo from "../public/logo.png";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {


  const { showSideBar, handleShowSideBar } = useRoot();
  const handleShow = () => {
    handleShowSideBar(!showSideBar);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle option selection
  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    toggleDropdown();

    switch (option) {
      case "Forum Data":
        window.open("https://forum.tronique.info/", "_blank");
        break;
      case "DexTrade Data":
        window.open("https://trades.tronique.info", "_blank");
        break;
      case "Documentation Data":
        window.open("https://forum.tronique.info/", "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`sm:hidden flex items-center justify-center px-3 bg-[#1F1F1F] ${showSideBar? "flex-col h-[100vh] w-[80%] z-[2000] border-r-[1px]" : "h-[70px] w-[100%]"}`}
    >
      <div className="flex justify-between items-center w-[90%]">
        <div className="flex justify-center items-center">
      {showSideBar ? (
            <button
              className="transition mx-2 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={handleShow}
            >
              <MdOutlineMenuOpen className="text-white text-3xl" />
            </button>
          ) : (
            <button
              className="transition  hover:-translate-y-1 hover:scale-110 duration-300 mx-2"
              onClick={handleShow}
            >
              <MdOutlineMenu className="text-white text-3xl" />
            </button>
          )}
      <a href="https://tronique-homepage.vercel.app/">
        <Image
          src={logo}
          alt="logo"
          className={"w-[100px]"}
        ></Image>
        </a>
        </div>
        <button className="">
            <RiChatNewFill
              onClick={() =>{
                console.log("btn clicked")
                toast("Coming Soon 🚀", {
                  duration: 1000,
                })}
              }
              className="text-white rounded-lg text-3xl text-center my-7"
            />
        </button>
      </div>
      

      <div
        className={` flex mx-auto bg-[#1F1F1F] ${
          showSideBar ? "w-[80%]" : "w-10 ml-4"
        }`}
      >
          <div className="w-full">
            <button
              type="button"
              className={`flex items-center justify-center ${
                showSideBar ? "w-[62vw]" : "w-full"
              } rounded-md border text-white border-gray-300 bg-[#1F1F1F] px-2 py-2 text-sm font-medium hover:bg-[#bababa] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500`}
              onClick={toggleDropdown}
              aria-expanded={showDropdown ? "true" : "false"}
              aria-haspopup="true"
            >
              {showSideBar && (selectedOption || "DexTrade Data")}{" "}
              <FaCaretRight className={`${showSideBar && "ml-3"}`} />
            </button>
          </div>

          {showDropdown && (
            <div
              className={`absolute mt-10 w-[200px] rounded-md shadow-lg bg-[#d2d0d0] ring-1 ring-black ring-opacity-5 focus:outline-none z-20 ${showSideBar?"w-[62vw] left[50%]":"w-[200px] right-[5%]"}`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <button
                  className="block w-full px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  DexTrade Data
                </button>
                <button
                  onClick={() => handleOptionSelect("Forum Data")}
                  className="block w-full px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Forum Data
                </button>
                <button
                  // onClick={() => handleOptionSelect("Documentation Data")}
                  onClick={() => {
                    toast("Coming Soon 🚀", {
                      duration: 1000,
                    });
                    toggleDropdown();
                  }}
                  className="block w-full px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Documentation Data
                </button>
              </div>
            </div>
          )}
      </div>

      <div
        className={`mt-auto ${
          showSideBar
            ? "flex flex-row justify-center ml-auto"
            : "hidden"
        }`}
      >
        <button className=" mx-3 my-3">
          <HiCog
            className=" text-white text-3xl"
            onClick={() =>
              toast("Coming Soon 🚀", {
                duration: 1000,
              })
            }
          />
        </button>
        <button className="mx-3 my-3">
          <FaClockRotateLeft className=" text-white text-lg" />
        </button>
        <Image src={icon} alt="icon" className="w-6 mx-3 my-3"></Image>
      </div>
      {/* <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
            backgroundColor: "#d2d0d0",
            color: "#000",
            boxShadow: "none",
            borderRadius: "50px",
            padding: "3px 5px",
          },
        }}
      /> */}
    </div>
  );
}
