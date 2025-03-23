import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMessageCircle,
  FiArrowRight,
  FiUsers,
  FiLock,
  FiZap,
  FiImage,
  FiHeart,
  FiMessageSquare,
  FiGlobe,
  FiCamera,
  FiVideo,
} from "react-icons/fi";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-indigo-600 mr-2 text-3xl">
              <FiMessageCircle className="inline animate-pulse" />
            </span>
            <span className="font-bold text-xl text-gray-800">ConvoSync</span>
          </motion.div>

          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#social-feed"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Social Feed
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </motion.nav>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform"
            >
              Sign Up Free
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Share, Connect, Chat in One Place
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Post photos, share moments, update your status, and chat with
              friends in real-time on our all-in-one social platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#signup"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full text-center hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform flex items-center justify-center"
              >
                Get Started <FiArrowRight className="ml-2" />
              </a>
              <a
                href="#demo"
                className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full text-center hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                Watch Demo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 relative"
          >
            {/* Animated Chat Interface */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FiMessageCircle className="mr-2" />
                  <span className="font-medium">ConvoSync</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-4 h-64 flex flex-col">
                {/* Post Creation UI */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-2">
                      A
                    </div>
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      className="bg-transparent flex-1 outline-none text-gray-700 text-sm"
                    />
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <button className="flex items-center text-gray-600 text-sm">
                      <FiImage className="mr-1 text-green-500" /> Photo
                    </button>
                    <button className="flex items-center text-gray-600 text-sm">
                      <FiVideo className="mr-1 text-red-500" /> Video
                    </button>
                    <button className="flex items-center text-gray-600 text-sm">
                      <FiGlobe className="mr-1 text-blue-500" /> Status
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      Post
                    </motion.button>
                  </div>
                </div>

                {/* Animated Post */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden"
                >
                  <div className="p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
                        B
                      </div>
                      <div>
                        <div className="font-medium text-sm">Sarah Johnson</div>
                        <div className="text-xs text-gray-500">2 hours ago</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Just finished the hiking trail! The view was amazing! 🏔️
                    </p>
                  </div>
                  <div className="bg-gray-200 h-24 flex items-center justify-center">
                    <FiImage className="text-gray-400 text-2xl" />
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center"
                      >
                        <FiHeart className="mr-1 text-red-500" /> 24 Likes
                      </motion.button>
                      <button className="flex items-center">
                        <FiMessageSquare className="mr-1" /> 8 Comments
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Direct Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-3">
                    C
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-gray-800 text-sm">
                      Hey! Did you see Sarah's hiking post? We should plan our
                      trip too!
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      Just now
                    </span>
                  </div>
                </motion.div>

                {/* Message Input */}
                <div className="mt-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full p-3 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="absolute right-3 top-3 text-indigo-600">
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Indicators */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center text-green-500">
                <FiUsers className="mr-2" />
                <span className="font-medium">2,500+ Online</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center text-indigo-500">
                <FiZap className="mr-2" />
                <span className="font-medium">Lightning Fast</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Social Features You'll Love
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with friends, share moments, and communicate in multiple
              ways.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FiImage className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Photo Sharing
              </h3>
              <p className="text-gray-600">
                Share your favorite moments with high-quality photo uploads,
                filters, and albums.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <FiGlobe className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Status Updates
              </h3>
              <p className="text-gray-600">
                Keep friends updated with what you're doing, thinking, or
                feeling through customizable status updates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <FiMessageCircle className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Private Messaging
              </h3>
              <p className="text-gray-600">
                Chat privately with friends using real-time messaging with read
                receipts and typing indicators.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Feed Section */}
      <section id="social-feed" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Social Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what your feed could look like with ConvoSync.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Post Creation Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-xl shadow-md mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                  <FiCamera className="text-xl" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="w-full p-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-around pb-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-700"
                >
                  <FiImage className="mr-2 text-green-500" /> Photo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-700"
                >
                  <FiVideo className="mr-2 text-red-500" /> Video
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-700"
                >
                  <FiGlobe className="mr-2 text-blue-500" /> Status
                </motion.button>
              </div>
            </motion.div>

            {/* Animated Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    M
                  </div>
                  <div>
                    <h4 className="font-medium">Mike Johnson</h4>
                    <p className="text-gray-500 text-xs">
                      Yesterday at 3:45 PM
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Just got my new camera! Can't wait to share some photos from
                  my upcoming trip.
                </p>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <FiCamera className="text-gray-400 text-3xl" />
                </div>
                <div className="flex justify-between items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center text-gray-500"
                  >
                    <FiHeart className="mr-1 text-red-500" /> 124 likes
                  </motion.div>
                  <div className="text-gray-500 text-sm">32 comments</div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    A
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="w-full p-2 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    S
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Thompson</h4>
                    <p className="text-gray-500 text-xs">
                      This morning at 8:20 AM
                    </p>
                  </div>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400 mb-4">
                  <p className="text-indigo-800 font-medium">Status Update</p>
                  <p className="text-gray-700">
                    Starting my new job today! Wish me luck! 🍀
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center text-gray-500"
                  >
                    <FiHeart className="mr-1 text-red-500" /> 87 likes
                  </motion.div>
                  <div className="text-gray-500 text-sm">15 comments</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to connect with friends?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of people already sharing moments on ConvoSync.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium inline-block shadow-lg hover:bg-gray-100 transition-colors"
            >
              Create Your Account
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center text-white mb-4">
                <FiMessageCircle className="mr-2 text-indigo-400" />
                <span className="font-bold text-xl">ConvoSync</span>
              </div>
              <p className="max-w-xs">
                Share moments, post photos, update status, and chat with friends
                all in one beautiful platform.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Mobile App
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Security
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Guidelines
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 ConvoSync. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
