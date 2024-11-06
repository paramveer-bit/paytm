'use client'

import { useState } from 'react'
import { Menu, X, CheckCircle, ArrowRight, DollarSign, Shield, Users } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { motion } from 'framer-motion'
import hero from '../public/hero.webp'
import Image from 'next/image'




export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  console.log(process.env.CLERK_SECRET_KEY)
  return (
    <div className="bg-gradient-to-b from-primary-50 to-primary-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
            <div className="flex items-center">
              <a href="#">
                <span className="sr-only">PayNest</span>
                <DollarSign className="h-10 w-auto text-primary-600" />
              </a>
              <div className="hidden ml-10 space-x-8 lg:block">
                <a href="#" className="text-base font-medium text-primary-600 hover:text-primary-500">
                  Features
                </a>
                <a href="#" className="text-base font-medium text-primary-600 hover:text-primary-500">
                  How it Works
                </a>
                <a href="#" className="text-base font-medium text-primary-600 hover:text-primary-500">
                  Pricing
                </a>
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <a
                href="/sign-in"
                className="inline-block bg-primary-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-black hover:bg-opacity-75"
              >
                Sign in
              </a>
              <a
                href="/sign-up"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
              >
                Sign up
              </a>
            </div>
            <div className="lg:hidden">
              <button
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-primary-500 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-primary-600 hover:bg-primary-50 hover:border-primary-500"
              >
                Features
              </a>
              <a
                href="#"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-primary-600 hover:bg-primary-50 hover:border-primary-500"
              >
                How it Works
              </a>
              <a
                href="#"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-primary-600 hover:bg-primary-50 hover:border-primary-500"
              >
                Pricing
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                    Introducing
                  </span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">Your Money,</span>
                    <span className="block text-primary-600">Your Control</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  PayNest revolutionizes the way you manage your finances. Add money from any bank, transfer funds securely, and take control of your financial future.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <p className="text-base font-medium text-gray-900">
                    Sign up for our waitlist to get early access.
                  </p>
                  <form action="#" className="mt-3 sm:flex">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:flex-1"
                    />
                    <Button type="submit" className="mt-3 w-full px-6 py-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
                      Notify me
                    </Button>
                  </form>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative mx-auto w-full rounded-lg lg:max-w-md"
                >
                  <div
                    className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  > 
                    <span className="sr-only">Watch our video to learn more</span>
                    <Image
                      src = {hero}
                      className="h-[150%] w-[150%] object-cover"
                      alt="App screenshot"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need in a digital wallet
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                PayNest provides a seamless and secure way to manage your money online.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <DollarSign className="h-6 w-6" color='black' aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Add Money Easily</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Link any bank account and add funds to your PayNest wallet with just a few clicks.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <Users className="h-6 w-6" color='black' aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Instant Transfers</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Send money to other PayNest users instantly, anytime and anywhere.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <Shield className="h-6 w-6" color='black' aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Bank-Level Security</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Your money and personal information are protected with state-of-the-art security measures.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <CheckCircle className="h-6 w-6" aria-hidden="true" color='black'/>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy to Use</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Our intuitive interface makes managing your money a breeze, even for beginners.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="bg-primary-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">How PayNest Works</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-200">
              Getting started with PayNest is quick and easy. Here's how it works:
            </p>
            <ol className="mt-8 text-left text-primary-200 space-y-4">
              <li className="flex items-center">
                <span className="flex-shrink-0 h-6 w-6 rounded-full border border-primary-200 flex items-center justify-center mr-3">1</span>
                Sign up for a free PayNest account
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 h-6 w-6 rounded-full border border-primary-200 flex items-center justify-center mr-3">2</span>
                Link your bank account or add funds via card
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 h-6 w-6 rounded-full border border-primary-200 flex items-center justify-center mr-3">3</span>
                Start sending and receiving money instantly
              </li>
            </ol>
            <a
              href="/sign-up"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
            >
              Get started now
              <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block">Start using PayNest today.</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex text-black items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-primary-600 hover:bg-primary-700"
                >
                  Get started
                </a>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443  2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2023 PayNest, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}