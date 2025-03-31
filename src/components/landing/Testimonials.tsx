"use client";
import { useState } from "react";
import Image from "next/image";
import Bg1 from "@/components/assets/Meeting1.jpg";
import { Quote } from "lucide-react";
import { LandingTitle } from "../ui/card";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className='py-10 lg:py-0 bg-gray-100' id='testimonial'>
      <LandingTitle title='Success Stories' text='What we have done' />
      <div className='grid lg:grid-cols-4 mx-4 lg:max-w-[1400px] mt-14 bg-white lg:mx-auto'>
        {stats.map((item: any, index: number) => (
          <div key={index} className='flex items-center flex-col gap-3 py-10 lg:py-20'>
            <h2 className='text-blue-800'>{item.count}</h2>
            <h6 className='text-gray-500'>{item.label}</h6>
          </div>
        ))}
      </div>
      <div className='pt-[120px] pb-[150px] relative'>
        <div className='max-w-[700px] mx-auto flex flex-col items-center gap-4'>
          <h2 className='z-20 text-white lg:text-[45px]'>Clients' Testimonials</h2>

          <p className='text-[21px] leading-[1.7] mt-5 text-blue-200 italic z-20 text-center transition-opacity duration-500'>
            {testimonials[currentIndex].text}
          </p>

          <div className='grid grid-cols-[20px,1fr] mt-5 gap-4 z-20'>
            <Quote className='text-white rotate-180' />
            <div className='flex flex-col gap-2'>
              <h6 className='text-white'>{testimonials[currentIndex].name}</h6>
              <p className='text-sm text-blue-200'>{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center absolute bottom-[100px] gap-2 z-20 w-full'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-8 border-2 border-white hover:bg-white h-[8px] ${
                currentIndex === index ? "bg-white" : "bg-transparent"
              }`}
            ></button>
          ))}
        </div>

        <div className='bg-blue-900 opacity-90 h-full w-full top-0 bottom-0 right-0 left-0 absolute z-10'></div>
        <Image
          src={Bg1}
          alt='About'
          width={300}
          height={200}
          className='w-full object-cover top-0 bottom-0 right-0 h-full left-0 absolute z-0'
        />
      </div>
    </section>
  );
}

const testimonials = [
  {
    text: "Midland LMS has completely changed the way I deliver courses. From secure video lessons to interactive quizzes and downloadable resources, everything is handled beautifully. I can now focus on teaching while the system does the rest.",
    name: "David O.",
    role: "Digital Marketing Coach",
  },
  {
    text: "We launched our internal employee training program using Midland LMS. The built-in assessments, Paystack integration, and course timing features make this one of the most complete LMS platforms available today.",
    name: "Tunde A.",
    role: "HR Manager, Fintech Company",
  },
];

const stats = [
  {
    count: 10000,
    label: "All Time Clients",
  },
  {
    count: 979,
    label: "Clients In This Year",
  },
  {
    count: 300,
    label: "New Projects",
  },
  {
    count: 34,
    label: "Avg Profit Increased",
  },
];
