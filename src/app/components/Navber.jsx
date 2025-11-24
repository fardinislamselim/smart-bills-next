"use client";
import {
  SignedOut,
  UserButton,
  useUser,
  SignedIn,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import React, { use } from "react";

function Navbar() {
  const { isSignedIn } = useUser();

const navLinks = (
  <>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/bills">Bills</Link>
    </li>
    {isSignedIn && (
      <>
        <li>
          <Link href="/add-bill">Add Bill</Link>
        </li>
        <li>
          <Link href="/my-pay-bills">My Bills</Link>
        </li>
      </>
    )}
  </>
);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="text-xl">
          <Image src={logo} alt="logo" width={40} height={40} />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
