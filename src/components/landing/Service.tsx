"use client";
import Image from "next/image";
import { Timer, Video, X } from "lucide-react";
import Piggy1 from "@/components/assets/Piggy1.jpg";
import Card2 from "@/components/assets/Card2.jpg";
import dashboard1 from "@/components/assets/dashboard2.png";
import teacher1 from "@/components/assets/teacher1.png";
import admin2 from "@/components/assets/admin2.png";
import { FileText } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Services() {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-3 max-w-screen-2xl mx-auto'>
        {MidlandsFeatures.map((item, index: number) => (
          <div
            key={index}
            className='grid px-4 lg:px-10 py-8 lg:py-14 grid-cols-[32px,1fr] lg:grid-cols-[56px,1fr] gap-6 relative overflow-hidden'
          >
            <div className='bg-blue-900 opacity-75 w-full h-full top-0 bottom-0 right-0 left-0 absolute z-10'></div>
            <Image src={item.bg} alt='Backgroud Image' className=' absolute opacity-20 object-cover' />
            <item.icon className='w-8 lg:w-14 h-8 lg:h-14 z-20 text-white' />
            <div className='flex flex-col gap-5 z-20'>
              <h4 className='max-w-[200px]'>{item.title}</h4>
              <p className='text-blue-100'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <Container id='service' className='pb-[220px] bg-gray-100'>
        <LandingTitle title='Services We Provide' text='Covered in these areas' />
        <div className='grid grid-cols-3 gap-10'>
          {services.map((service: any, index: number) => (
            <div key={index} className='bg-white group relative overflow-hidden rounded-lg shadow-md'>
              <div className='p-4'>
                <h3 className='text-xl font-semibold text-blue-800 mb-4'>{service.title}</h3>
              </div>
              <Reveal3>
                <div className='relative h-[400px]'>
                  <div className='overflow-hidden h-full'>
                    <Image
                      src={service.bg}
                      alt={service.title}
                      width={2000}
                      height={1000}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                      <button
                        onClick={() => setSelectedImage(service.bg)}
                        className='bg-white px-4 py-2 text-blue-700 text-sm rounded shadow hover:bg-blue-100'
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal3>
            </div>
          ))}
        </div>
      </Container> */}

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
    </>
  );
}

const MidlandsFeatures = [
  {
    bg: dashboard1,
    icon: Timer,
    title: "Time-Based Learning Access",
    description:
      "Control how long a learner can access a course—ideal for bootcamps, training cohorts, or expiring course models.",
  },
  {
    bg: teacher1,
    icon: FileText,
    title: "Quizzes After Each Module",
    description:
      "Reinforce knowledge and track learner progress with built-in quizzes and assessments after every module.",
  },
  {
    bg: admin2,
    icon: Video,
    title: "Encrypted Video Tutorials",
    description: "Protect your intellectual content with encrypted, stream-only video delivery—no downloads, no leaks.",
  },
];

const services = [
  {
    bg: dashboard1,
    title: "User Dashboard",
  },
  {
    bg: teacher1,
    title: "Teachers Dashboard",
  },
  {
    bg: admin2,
    title: "Admin Dashboard",
  },
  {
    bg: dashboard1,
    title: "Learning page",
    description: "Accept payments in multiple currencies and convert them into cryptocurrency seamlessly.",
  },
  {
    bg: teacher1,
    title: "Simple Integration",
    description: "Integrate Midlands into your website or app with minimal effort and easy-to-follow steps.",
  },
  {
    bg: admin2,
    title: "Real-Time Exchange Rates",
    description: "Get the best exchange rates for converting fiat currency to cryptocurrency.",
  },
];
