import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href={"/"}>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-primary">SmartBills</span>
              </h2>
            </Link>
            <p className="mt-4 text-sm opacity-80 leading-relaxed">
              SmartBills is your all-in-one solution to manage and pay your
              monthly utility bills easily, securely, and on time. Save time and
              stay organized!
            </p>

            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/bills"
                  className="hover:text-primary transition-colors"
                >
                  Bills
                </Link>
              </li>
              <li>
                <Link
                  href="/mypaybills"
                  className="hover:text-primary transition-colors"
                >
                  My Pay Bills
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary transition-colors"
                >
                  Help / FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-3 opacity-80">
              Subscribe to get latest updates and notifications.
            </p>
            <div className="form-control w-full max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pr-16"
                />
                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">SmartBills</span>. All rights
            reserved.
          </p>
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/mdfardinislamselim"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary font-medium"
            >
              Fardin Islam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;