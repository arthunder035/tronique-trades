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

export default function Sidebar() {
  // const { showSideBar, handleShowSideBar } = useRoot();
  // const handleShow = () => {
  //   handleShowSideBar(!showSideBar);
  // };

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
        window.open("https://example.com/forum-data", "_blank");
        break;
      case "DexTrade Data":
        window.open("https://example.com/dextrade-data", "_blank");
        break;
      case "Documentation Data":
        window.open("https://example.com/documentation-data", "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center bg-[#1F1F1F]
  ${showSideBar ? "w-[300px]" : "w-28"}`}
    >
      <div className="flex justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          className={`${showSideBar ? " ml-5 w-[120px] h-auto" : "hidden"}`}
        ></Image>

        <div
          className={`${
            showSideBar
              ? "flex flex-row-reverse justify-center ml-auto"
              : "flex flex-col justify-center items-center"
          }`}
        >
          {showSideBar ? (
            <button
              className="transition m-4 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={handleShow}
            >
              <MdOutlineMenuOpen className="text-white text-4xl" />
            </button>
          ) : (
            <button
              className="transition mt-8 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={handleShow}
            >
              <MdOutlineMenu className="text-white text-4xl" />
            </button>
          )}

          <button className="my-5">
            <RiChatNewFill
              onClick={() =>
                toast("Coming Soon 🚀", {
                  duration: 1000,
                })
              }
              className="text-white rounded-lg text-3xl text-center"
            />
          </button>
        </div>
      </div>

      <div
        className={` flex flex-col mx-auto bg-[#1F1F1F] ${
          showSideBar ? "w-[200px]" : "w-10"
        }`}
      >
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className=" flex items-center justify-center w-full rounded-md border text-white border-gray-300 bg-[#1F1F1F] px-4 py-2 text-sm font-medium hover:bg-[#bababa] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
              className="origin-top-right relative right-0 mt-2 w-[200px] rounded-md shadow-lg bg-[#d2d0d0] ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                {/* Options */}
                <button
                  // onClick={() => handleOptionSelect("DexTrade Data")}
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
      </div>

      <div
        className={`mt-auto ${
          showSideBar
            ? "flex flex-row justify-center ml-auto"
            : "flex flex-col items-center justify-center mb-5"
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
      <Toaster
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
      />
    </div>
  );
}
