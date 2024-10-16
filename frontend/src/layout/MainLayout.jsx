import { Outlet } from "react-router-dom"
import Navbar from "../components/headers/Navbar"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <Navbar/>
        <Outlet/>

        <footer className="bg-gray-800 dark:bg-gray-500 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: About */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We provide the best services to help you grow your business. Our team of experts is here to assist you in every step of the way.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/services" className="hover:text-white">Services</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Column 3: Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl transition duration-200" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-600 hover:text-pink-800 text-2xl transition duration-200" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-700 hover:text-blue-900 text-2xl transition duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center mt-8">
            <p className="text-gray-500 dark:text-white">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default MainLayout