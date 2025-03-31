"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal3 } from "@/app/components/animations/Text";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero1 from "@/components/assets/House2.jpg";
import Hero3 from "@/components/assets/Meeting1.jpg";
import { Header1 } from "./Header";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoomKey, setZoomKey] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    setZoomKey((prevKey) => prevKey + 1);
  };

  const prevSlide = () => setSlideIndex((prevIndex) => (prevIndex - 1 + heroData.length) % heroData.length);

  const goToSlide = (index: number) => setSlideIndex(index);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <section
      id='Home'
      className='relative h-[500px] lg:h-[750px] overflow-hidden pt-36 pb-24 lg:px-8 xl:px-24 px-4 max-w-screen-2xl mx-auto'
    >
      <div className='bg-gradient-to-b from-blue-950 opacity-90 to-transparent  w-full h-full top-0 bottom-0 right-0 left-0 absolute z-10'></div>
      <Header1 />
      <Image
        key={zoomKey}
        src={heroData[slideIndex].img}
        alt={heroData[slideIndex].title}
        className='absolute left-0 right-0 top-0 w-full h-full object-cover animate-[slowZoom_10s_linear_infinite]'
        width={1000}
        height={1000}
      />

      <div className='flex items-start flex-col gap-2 px-4 lg:px-8 xl:px-24 z-20 absolute top-[35%] w-full right-0 left-0 '>
        {heroData[slideIndex]?.subTitle && (
          <h2 className='text-blue-300 font-[400] mb-[-10px] lg:mb-[-25px]'>{heroData[slideIndex]?.subTitle}</h2>
        )}
        <h1>{heroData[slideIndex].title}</h1>
        <Reveal3>
          <h5 className='max-w-[600px] text-[18px] font-normal'>{heroData[slideIndex].text}</h5>
        </Reveal3>
        <div className='flex gap-4 mt-5'>
          <Button onClick={() => router.push("#cases")} variant={"outline"}>
            Learn more
          </Button>
          <Button>Contact us</Button>
        </div>
      </div>

      <div className='hidden lg:flex lg:px-2 z-20 absolute top-[50%] w-full justify-between right-0 left-0 '>
        <button className='text-white hover:text-gray-300 disabled:text-gray-400' onClick={prevSlide}>
          <ChevronLeft className='w-12 h-12' />
        </button>
        <button className='text-white hover:text-gray-300 disabled:text-gray-400' onClick={nextSlide}>
          <ChevronRight className='w-12 h-12' />
        </button>
      </div>

      <div className='absolute z-20 gap-2 bottom-10 items-center w-full justify-center right-0 left-0 mx-auto flex mt-4'>
        {heroData.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex p-1 cursor-pointer items-center rounded-full ${
              index === slideIndex ? "border-2 w-5 h-5 border-white" : "w-4 h-4 bg-gray-300"
            }`}
          >
            <div
              className={`w-[10px] h-[10px] rounded-full ${index === slideIndex ? "bg-white" : "bg-gray-300"}`}
            ></div>
          </span>
        ))}
      </div>
    </section>
  );
};

const heroData = [
  {
    img: Hero1,
    title: "Midlands LMS",
    text: "An all-in-one learning management system built for modern educators and institutions. Sell, manage, and deliver courses securely and efficiently.",
  },
  {
    img: Hero3,
    subTitle: "Create & Sell",
    title: " Professional Courses",
    text: "Deliver engaging learning experiences with encrypted video lessons, quizzes, and resource downloads – all in one platform.",
  },
];
