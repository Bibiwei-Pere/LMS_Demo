"use client";
import Image from "next/image";
import Meeting2 from "@/components/assets/Meeting2.jpg";
import Meeting3 from "@/components/assets/Meeting3.jpg";
import Man1 from "@/components/assets/Man1.jpg";
import People1 from "@/components/assets/People1.jpg";
import { Container } from "../ui/containers";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function AboutUs() {
  const router = useRouter();
  return (
    <section id='about' className='max-w-screen-2xl w-full h-full relative bg-gray-100'>
      <Image
        src={Man1}
        alt='About'
        width={800}
        height={800}
        className='max-w-[800px] max-h-[500px] rounded-md w-full object-cover relative top-[-100px] mx-auto z-20'
      />
      <Container className='py-0 relative top-[-50px] gap-8'>
        <div className='z-20 max-w-[600px] mx-auto flex flex-col items-center '>
          <p className='text-blue-100'>OUR LITTLE STORY</p>
          <h2 className='text-white mt-3'>Something About us</h2>
        </div>
        <div className='grid z-20 grid-cols-1 lg:grid-cols-2 gap-10'>
          <p className='text-lg leading-[1.6] text-blue-100'>
            Midland LMS is a modern Learning Management System built for institutions, coaches, and content creators
            looking to sell courses online. Our platform simplifies the process of creating, managing, and delivering
            courses, making online education seamless and profitable.
          </p>
          <p className='text-lg leading-[1.6] text-blue-100'>
            With built-in features like Paystack-powered course purchases, time-bound course access, interactive
            quizzes, encrypted video tutorials, and downloadable PDF/DOCX resources, Midland LMS offers a full suite of
            tools to engage learners and grow your training business.
          </p>
        </div>
        <div className='grid lg:grid-cols-2 mt-14 z-20'>
          <Image src={Meeting2} alt='About' className='w-full h-full object-cover' />
          <div className='flex flex-col gap-2 bg-white px-14 pt-16 pb-10'>
            <p> DID YOU KNOW THAT</p>
            <h2 className='text-blue-800 leading-[1.5] max-w-[400px]'>
              Trusted by educators, trainers, and institutions across industries
            </h2>
            <p className='text-[16px] my-5'>
              Midland LMS provides a scalable, secure, and feature-rich platform for online education. Whether you're
              running a private academy, vocational training center, or corporate upskilling program, Midland LMS equips
              you with everything needed to succeed in digital learning.
            </p>
            <Button
              className='border-blue-800 text-blue-800 hover:text-white ml-0'
              onClick={() => router.push("#purchase")}
              variant={"outline"}
            >
              Purchase
            </Button>
          </div>
          <div className='flex flex-col gap-2 bg-gray-900 px-14 pt-16 pb-10'>
            <h2 className='text-white max-w-[350px]'>The Ultimate LMS for Course Creators & Institutions</h2>
            <p className='text-white text-lg'>
              We combine intuitive design with robust features to provide a learning experience that works for
              instructors and students alike.
            </p>
            <div className='my-5 flex flex-col gap-3'>
              {[
                "Course purchase with Paystack integration",
                "Timed course access and progression control",
                "Quizzes and assessments after each module",
                "Encrypted video streaming for secure content delivery",
                "Support for PDF and DOCX resource downloads",
              ].map((item, index: number) => (
                <div className='flex gap-2 items-center' key={index}>
                  <Check className='text-white w-4 h-4' />
                  <p className='text-gray-300'>{item}</p>
                </div>
              ))}
            </div>
            <Button className='mt-2 ml-0' onClick={() => router.push("#purchase")} variant={"outline"}>
              Purchase
            </Button>
          </div>
          <Image src={Meeting3} alt='About' className='w-full h-full object-cover' />
        </div>
      </Container>

      <div className='bg-blue-950 opacity-75 max-h-[900px] w-full top-0 bottom-0 right-0 left-0 absolute z-10'></div>
      <Image
        src={People1}
        alt='About'
        width={300}
        height={200}
        className='w-full object-cover top-0 max-h-[900px] bottom-0 right-0 left-0 absolute z-0'
      />
    </section>
  );
}
