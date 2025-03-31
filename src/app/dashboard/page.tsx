"use client";
import { ContainerDashboard, DashboardHeader } from "@/components/ui/containers";
import React, { useEffect, useState } from "react";
import { Step1, Step2, Step3 } from "@/components/dashboard/FormData";
import { useGetUser } from "@/hooks/users";
import { SkeletonCard2 } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState<any>(null);
  const { data: userData, status } = useGetUser();

  console.log(userData);
  useEffect(() => {
    if (userData) {
      setUser(userData);
      if (userData?.isSubmit) setCurrentStep(2);
    }
  }, [userData]);

  const handleNext = (user: any) => {
    if (user) setUser(user);
    if (currentStep < projectData.length - 1) setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prevStep) => prevStep - 1);
    else setCurrentStep((prevStep) => prevStep - 1);
  };

  if (status !== "success") <SkeletonCard2 />;
  return (
    <ContainerDashboard className='grid md:grid-cols-[250px,1fr] gap-10'>
      <div className='hidden md:flex flex-col top-10 mt-10'>
        <div className='fixed w-[250px]'>
          {projectData.map((item: any, index: number) => (
            <div key={item.number} className='grid relative grid-cols-[35px,1fr] gap-5 pb-12'>
              <div
                className={`h-full w-full top-[-100px] left-[16px] absolute ${
                  index === 0
                    ? "" // No border for the first step
                    : currentStep >= index
                    ? "border-purple-800 border-dashed"
                    : "border-gray-300 border-dashed"
                } ${index === 0 ? "" : "border-l-[3px]"}`}
              ></div>
              <span
                className={`text-[20px] z-10 font-semibold text-white h-[35px] flex items-center justify-center w-[35px] rounded-full ${
                  currentStep >= index ? "bg-purple-800" : "bg-gray-400"
                }`}
              >
                {item.number}
              </span>
              <div className='flex flex-col'>
                <h6>{item.title}</h6>
                <p>{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <DashboardHeader hidden className='pt-10 pl-0 md:pl-0 pb-2' title='Register for Lassod E-Learning' />
        <div className='flex flex-col space-y-5'>
          {projectData.map((item: any, index: number) =>
            index === currentStep ? (
              <div key={index}>
                <span className='md:hidden block'>
                  <h3 className='text-xl font-bold'>{item.title}</h3>
                  <p className='mb-4'>{item.details}</p>
                </span>
                {index === 0 && <Step1 user={user} handleNext={handleNext} />}
                {index === 1 && <Step2 user={user} setUser={setUser} handleBack={handleBack} handleNext={handleNext} />}
                {index === 2 && <Step3 user={user} setUser={setUser} handleBack={handleBack} />}
              </div>
            ) : null
          )}
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default Dashboard;

const projectData = [
  {
    number: 1,
    title: "Personal Information",
    details: "Fill in your personal information",
  },
  {
    number: 2,
    title: "Course Selection",
    details: "Select your preferred course",
  },
  {
    number: 3,
    title: "Summary",
    details: "Review your data and submit",
  },
];
