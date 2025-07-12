import React from "react";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            E-Commerce
          </h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for top-quality products. Fast delivery, best
            deals, and secure checkout.
          </p>
          <div className="flex gap-4 mt-4 text-yellow-400 text-lg">
            <a
              href="https://github.com/faisalquaiyum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/faisalquaiyum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/_faisalquaiyum/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/md-faisal-quaiyum-b943a922b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Press Releases
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-300">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/customer-service" className="hover:text-yellow-300">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:text-yellow-300">
                Support
              </Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:text-yellow-300">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:text-yellow-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:text-yellow-300">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@ecommerce.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> 123 Market St, San Francisco, CA
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Faisal - E-Commerce Project. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
