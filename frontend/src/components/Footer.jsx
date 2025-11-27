import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
          <a href="#" className="hover:text-primary transition">About Us</a>
          <a href="#" className="hover:text-primary transition">Contact</a>
          <a href="#" className="hover:text-primary transition">FAQ</a>
          <a href="#" className="hover:text-primary transition">Shipping & Returns</a>
          <a href="#" className="hover:text-primary transition">Privacy Policy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition"><Facebook size={20} /></a>
          <a href="#" className="hover:text-primary transition"><Twitter size={20} /></a>
          <a href="#" className="hover:text-primary transition"><Instagram size={20} /></a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-400 mt-6 mb-5">
        © {new Date().getFullYear()} NexGadgets. All rights reserved.
      </p>
    </footer>
  );
}
