"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card1 from "@/components/assets/Card1.jpg";
import Card2 from "@/components/assets/Card2.jpg";
import Crypto from "@/components/assets/Crypto.jpg";
import Coin3 from "@/components/assets/Coin3.jpg";
import Coin2 from "@/components/assets/Coin2.jpg";
import Calculator from "@/components/assets/Calculator.jpg";
import Btc1 from "@/components/assets/Btc1.jpg";
import { LandingTitle } from "../ui/card";
import { useIsMobile } from "@/lib/useMobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import dashboard1 from "@/components/assets/dashboard2.png";
import teacher1 from "@/components/assets/teacher1.png";
import admin2 from "@/components/assets/admin2.png";
import quiz from "@/components/assets/quiz.png";
import learning from "@/components/assets/learning.png";

export function Cases() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const visibleCards = isMobile ? 1 : 4; // Show 1 slide on mobile, 4 on larger screens
  const totalSlides = cases.length - visibleCards + 1; // Number of dots needed

  // Function to handle dot navigation
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll for mobile view
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cases.length); // Loop through slides
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isMobile]);

  return (
    <section id='cases' className='py-8 lg:py-20 flex flex-col gap-14 bg-gray-100'>
      <LandingTitle title='Features' text='View all features' />
      <div className='overflow-hidden relative w-full'>
        <div
          className='flex transition-transform duration-500 pb-24 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
        >
          {cases.map((item: any, index) => (
            <div key={index} className={`flex-shrink-0 ${isMobile ? "w-full" : "w-1/4"}`}>
              {/* <div key={index} className='w-1/4 flex-shrink-0'> */}
              <div className='h-[350px] group relative overflow-hidden'>
                <Image
                  src={item.image}
                  alt='Image'
                  width={400}
                  height={400}
                  className='w-full h-full object-cover transform transition-transform duration-1000 scale-100 hover:scale-110'
                />
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <button
                    onClick={() => setSelectedImage(item.image)}
                    className='bg-white px-4 py-2 text-blue-700 text-sm rounded shadow hover:bg-blue-100'
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div className='relative overflow-hidden flex flex-col gap-3 px-7 pt-7 pb-[130px]'>
                <h4 className='text-xl font-semibold mb-2 z-20'>{item.title}</h4>
                <p className='mb-4 z-20 text-gray-200'>{item.description}</p>
                <Link
                  href='#'
                  onClick={() => setSelectedImage(item.image)}
                  className='text-white hover:text-blue-800 z-20'
                >
                  Preview →
                </Link>
                <div className='bg-blue-900 opacity-90 h-full w-full top-0 bottom-0 right-0 left-0 absolute z-10'></div>
                <Image
                  src={item.image}
                  alt='About'
                  width={300}
                  height={200}
                  className='w-full object-cover top-0 bottom-0 right-0 h-full left-0 absolute z-0'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center absolute bottom-[80px] gap-2 z-20 w-full'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-8 border-2 border-white hover:bg-white h-[8px] ${
                currentIndex === index ? "bg-white" : "bg-transparent"
              }`}
            ></button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className='max-w-full max-h-screen bg-black p-0 overflow-scroll'>
          <div className='relative w-full h-full'>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 z-10 bg-white text-black p-1 rounded-full'
            >
              <X className='w-5 h-5' />
            </button>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt='Preview'
                width={2000}
                height={1000}
                className='w-full h-auto object-contain'
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

const cases = [
  {
    image: dashboard1,
    title: "Instructor Dashboard",
    description:
      "Gain full control over course creation, learner activity, earnings, and performance tracking—all in one powerful dashboard.",
    link: "#",
  },
  {
    image: teacher1,
    title: "Student Learning Experience",
    description:
      "Deliver a distraction-free learning interface with module navigation, progress indicators, and clean video playback.",
    link: "#",
  },
  {
    image: admin2,
    title: "Quiz & Evaluation Engine",
    description:
      "Assess learners with quizzes after each module and analyze their results to improve course engagement.",
    link: "#",
  },
  {
    image: quiz,
    title: "Secure Paystack Checkout",
    description:
      "Allow learners to purchase courses securely via Paystack with seamless transactions and real-time confirmation.",
    link: "#",
  },
  {
    image: learning,
    title: "Course Management System",
    description:
      "Organize, edit, and update your courses. Add modules, resources, and control pricing and access duration with ease.",
    link: "#",
  },
  {
    image: quiz,
    title: "User & Instructor Management",
    description:
      "Admins can manage users, assign roles, monitor activity, and ensure a healthy learning ecosystem across the platform.",
    link: "#",
  },
];
