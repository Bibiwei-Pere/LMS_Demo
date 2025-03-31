"use client";
import React, { useEffect, useState } from "react";
import { ContainerDashboard } from "@/components/ui/containers";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formStep1, formStep2 } from "@/app/components/schema/Forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AlertTriangle, Loader2 } from "lucide-react";
import { formatDateShort, scrollToTop } from "@/lib/helpers";
import { useToast } from "../ui/use-toast";
import DatePicker from "react-datepicker";
import { useEnrollUser, useUpdateUser } from "@/hooks/users";
import Image from "next/image";
import { AvatarUpload } from "./FileUpload";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleCheckbox } from "../ui/checkbox";
import { usePostUpload } from "@/hooks/upload";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const Step1 = ({ user, handleNext }: any) => {
  const { mutation } = useUpdateUser();
  const { mutation: postAvatar } = usePostUpload();
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToTop();
    }, 100);
    return () => clearTimeout(timer);
  }, [user]);

  const form = useForm<z.infer<typeof formStep1>>({
    resolver: zodResolver(formStep1),
  });

  useEffect(() => {
    if (user)
      form.reset({
        email: user?.email || "",
        matricNo: user?.matricNo || "",
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        phone: user?.phone || "",
        dob: user?.dob && new Date(user?.dob),
        gender: user?.gender,
      });
  }, [user]);

  console.log(user);

  const onSubmit = async (values: z.infer<typeof formStep1>) => {
    console.log(values);
    let uploadedFile: any;
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);

      await new Promise((resolve) => {
        postAvatar.mutate(formData, {
          onSuccess: (response) => {
            console.log(response.data.data);
            uploadedFile = response.data.data;
            resolve(response.data.data); // ✅ Ensure form submission waits for upload
          },
        });
      });
    }

    mutation.mutate(
      {
        ...values,
        avatar: uploadedFile && {
          name: uploadedFile?.uniqueName,
          fileId: uploadedFile?.fileId,
          url: uploadedFile?.signedUrl,
        },
        userId: user?._id,
      },
      {
        onSuccess: (response) => handleNext(response?.data),
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[826px] mt-4'>
        <ContainerDashboard className='bg-gray-100 rounded-lg pt-5 pb-10'>
          <div className='flex gap-4 sm:gap-[25px] justify- w-full mt-3'>
            <Image
              src={avatar ? URL.createObjectURL(avatar) : user?.avatar?.url || "/noavatar.png"}
              alt='Avatar'
              className='object-cover h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full'
              width={500}
              height={500}
            />
            <AvatarUpload setAvatar={setAvatar} avatar={avatar} />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-8'>
            <FormField
              control={form.control}
              name='firstname'
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Firstname</FormLabel>
                  <Input placeholder='Enter your firstname' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastname'
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Lastname</FormLabel>
                  <Input placeholder='Enter your lastname' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Phone number</FormLabel>
                  <Input placeholder='Enter your phone number' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn(!field.value && "text-gray-400")}>
                      <SelectValue placeholder={field.value || "Select gender"} />
                    </SelectTrigger>
                    <SelectContent>
                      {gender.map((item: string) => (
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <h6 className='mt-3'>Academic data:</h6>
                  <FormLabel>Email:</FormLabel>
                  <Input disabled placeholder='Email address' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='matricNo'
              render={({ field }) => (
                <FormItem>
                  <h6 className='mt-3 text-gray-100'>Project size:</h6>
                  <FormLabel>MatricNo:</FormLabel>
                  <Input disabled placeholder='Matric number' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='mt-8 flex flex-col gap-1'>
                <FormLabel>Date of birth</FormLabel>
                <DatePicker
                  placeholderText='Select your date of birth'
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat='MMMM d, yyyy'
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode='select'
                  className='font-normal text-sm text-black border right-0 px-4 h-11 border-gray-200 rounded-xl shadow-sm shadow-gray-300 hover:border-black w-full outline-none'
                  minDate={new Date(1964, 0, 1)}
                  maxDate={new Date()}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </ContainerDashboard>
        <Button disabled={postAvatar.isPending || mutation.isPending} className='mt-10 mr-0'>
          {mutation.isPending || postAvatar.isPending ? <Loader2 className='animate-spin w-4 h-4' /> : "Proceed"}
        </Button>
      </form>
    </Form>
  );
};

export const Step2 = ({ setUser, user, handleBack, handleNext }: any) => {
  const { mutation } = useUpdateUser();
  const { toast } = useToast();
  const [leadershipCohorts, setLeadershipCohorts] = useState(leadershipCohortData);
  const [graphicCohorts, setGraphicCohorts] = useState(graphicCohortData);
  const [webCohorts, setWebCohorts] = useState(webCohortData);

  const form = useForm<any>({
    resolver: zodResolver(formStep2),
  });

  useEffect(() => {
    if (user?.courses)
      form.reset({
        courses: user.courses || [],
      });
  }, [user]);

  useEffect(() => {
    if (user?.cohortCounts) {
      // Update spaceLeft in all courses
      const updateCohortSpaces = (cohorts: any[], courseTitle: string) =>
        cohorts.map((cohort) => ({
          ...cohort,
          spaceLeft: user.cohortCounts.find((c: any) => c.title === courseTitle)?.[cohort.cohort] || 0,
        }));

      setLeadershipCohorts(updateCohortSpaces(leadershipCohorts, "Leadership"));
      setGraphicCohorts(updateCohortSpaces(graphicCohorts, "Graphic Design"));
      setWebCohorts(updateCohortSpaces(webCohorts, "Web Design"));
    }
  }, [user?.cohortCounts]);

  const courses = [
    {
      name: "Leadership",
      key: "course1",
      cohorts: leadershipCohorts,
      description: "Develop essential leadership skills to inspire and lead effectively.",
    },
    {
      name: "Web Design",
      key: "course2",
      cohorts: webCohorts,
      description: "Master UI/UX principles, HTML, CSS, and JavaScript for stunning websites.",
    },
    {
      name: "Graphic Design",
      key: "course3",
      cohorts: graphicCohorts,
      description: "Learn creative design techniques, branding, and visual storytelling.",
    },
  ];

  const handleCohortSelection = (item: any) => {
    setUser((prev: any) => {
      const prevCourses = prev?.courses || [];

      const existingCourseIndex = prevCourses.findIndex((c: any) => c.title === item.title);

      if (existingCourseIndex !== -1 && prevCourses[existingCourseIndex].cohort === item.cohort) {
        const updatedCourses = prevCourses.filter((c: any) => !(c.title === item.title && c.cohort === item.cohort));
        form.setValue("courses", updatedCourses);
        return { ...prev, courses: updatedCourses };
      }

      if (existingCourseIndex !== -1) {
        const updatedCourses = [...prevCourses];
        updatedCourses[existingCourseIndex] = item;
        form.setValue("courses", updatedCourses);
        return { ...prev, courses: updatedCourses };
      }

      if (prevCourses.length < 2) {
        const updatedCourses = [...prevCourses, item];
        form.setValue("courses", updatedCourses);
        return { ...prev, courses: updatedCourses };
      }

      toast({
        variant: "destructive",
        title: "Selection Limit Reached",
        description: "You can only select up to 2 courses.",
      });

      return prev;
    });
  };

  const onSubmit = (values: any) => {
    console.log(values);

    // Check if exactly 2 courses are selected
    if (!user?.courses || user?.courses.length !== 2) {
      toast({
        variant: "destructive",
        title: "Course Selection Error",
        description: "You must select exactly 2 courses.",
      });
      return;
    }

    if (!user?.courses.some((c: any) => c.title === "Leadership")) {
      toast({
        variant: "destructive",
        title: "Selection Required",
        description: "You must select a cohort for Leadership.",
      });
      return;
    }

    mutation.mutate(
      { ...values, userId: user?._id },
      {
        onSuccess: (response) => handleNext(response?.data),
      }
    );
  };

  return (
    <Form {...form}>
      <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
        <ContainerDashboard className='bg-gray-50'>
          {courses.map(({ name, key, cohorts, description }) => (
            <Accordion type='single' collapsible key={key}>
              <AccordionItem className='max-w-full px-0' value={key}>
                <AccordionTrigger>
                  <div className='flex flex-col'>
                    <h6>
                      {name}
                      {key === "course1" && <sup className='text-red-700'>*compulsory</sup>}
                    </h6>
                    <p>{description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className='flex flex-col gap-3'>
                    {cohorts.map((item: any) => (
                      <li className='flex items-center gap-3' key={item.cohort}>
                        <FormField
                          control={form.control}
                          name={`${key}.cohort`}
                          render={({}) => (
                            <div className='flex items-center gap-1 w-full cursor-pointer'>
                              <CircleCheckbox
                                checked={user?.courses.some((c: any) => c.title === name && c.cohort === item.cohort)}
                                onCheckedChange={() => handleCohortSelection(item)}
                                disabled={item.spaceLeft === 0} // ✅ Disable if no space left
                              />

                              <button
                                type='button'
                                className={`flex items-start text-sm md:text-[16px] justify-between ${
                                  item.spaceLeft === 0
                                    ? "cursor-not-allowed opacity-50"
                                    : "hover:text-purple-800 cursor-pointer"
                                } w-full gap-1`}
                                onClick={() => item.spaceLeft > 0 && handleCohortSelection(item)} // ✅ Prevent clicks if full
                                disabled={item.spaceLeft === 0} // ✅ Disable if no space left
                              >
                                <span className='flex items-start flex-col'>
                                  Cohort {item.cohort}
                                  <span className='text-xs'>
                                    {item.time} {item.day}
                                  </span>
                                </span>
                                <span className='flex items-end flex-col'>
                                  <span className={`text-${item.spaceLeft === 0 ? "gray-500" : "red-700"}`}>
                                    {item.spaceLeft || "--"}
                                  </span>
                                  <span className='text-xs'>space left</span>
                                </span>
                              </button>
                            </div>
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ContainerDashboard>
        <div className='flex justify-end'>
          <div className='flex gap-4 mt-10 sm:w-full max-w-[300px]'>
            <Button variant={"outline"} className='mr-0' onClick={handleBack}>
              Previous
            </Button>
            <Button disabled={mutation.isPending} className='mr-0'>
              {mutation.isPending ? <Loader2 className='animate-spin w-4 h-4' /> : "Proceed"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export const Step3 = ({ setUser, user, handleBack }: any) => {
  const { mutation } = useUpdateUser();
  const { mutation: postUser } = useEnrollUser();
  const { toast } = useToast();
  // const { data: aa } = useGetCourses();

  console.log(user);
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToTop();
    }, 100);
    return () => clearTimeout(timer);
  }, [user]);

  const onSubmit = () => {
    const courses = user?.courses?.map((course: any) => course.id) || [];
    console.log(courses);
    postUser.mutate(
      {
        email: user?.email,
        password: user?.pass,
        first_name: user?.firstname,
        last_name: user?.lastname,
        phone_number: user?.phone,
        courses,
      },
      {
        onSuccess: () =>
          mutation.mutate(
            { isSubmit: true, userId: user?._id },
            {
              onSuccess: (res) => {
                setUser(res?.data);
                toast({
                  variant: "success",
                  title: "Successful",
                  description: "You data has been saved, Thanks",
                });
              },
            }
          ),
      }
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      <ContainerDashboard className='bg-gray-50'>
        <Image
          src={user?.avatar?.url || "/noavatar.png"}
          alt='Avatar'
          className='object-cover shadow-md border-4 border-white h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full'
          width={500}
          height={500}
        />
        <div className='grid sm:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-4'>
            <h4 className='my-4'>Personal Information</h4>
            <span className='flex flex-col gap-1'>
              <p>Firstname:</p>
              <h6>{user?.firstname || "--"}</h6>
            </span>
            <span className='flex flex-col gap-1'>
              <p>Lastname:</p>
              <h6>{user?.lastname || "--"}</h6>
            </span>
            <span className='flex flex-col gap-1'>
              <p>Phone:</p>
              <h6>{user?.phone || "--"}</h6>
            </span>
            <span className='flex flex-col gap-1'>
              <p>Email:</p>
              <h6>{user?.email || "--"}</h6>
            </span>
            <span className='flex flex-col gap-1'>
              <p>Date of Birth:</p>
              <h6>{(user?.dob && formatDateShort(user?.dob)) || "--"}</h6>
            </span>
            <span className='flex flex-col gap-1'>
              <p>Gender:</p>
              <h6>{user?.gender || "--"}</h6>
            </span>
            <span className='flex flex-col gap-1'>
              <p>Matric Number:</p>
              <h6>{user?.matricNo || "--"}</h6>
            </span>
          </div>
          <div className='flex flex-col gap-4'>
            <h4 className='my-4'>Registered Courses</h4>
            {user?.courses?.length > 0 ? (
              user?.courses.map((course: any, index: number) => (
                <div className='flex flex-col gap-4 shadow-md border rounded-xl p-4' key={index}>
                  <span className='flex flex-col gap-1'>
                    <p>title:</p>
                    <h6>{course?.title || "--"}</h6>
                  </span>
                  <span className='flex flex-col gap-1'>
                    <p>Cohort:</p>
                    <h6>{course?.cohort || "--"}</h6>
                  </span>
                  <span className='flex flex-col gap-1'>
                    <p>Date:</p>
                    <h6>{course?.day || "--"}</h6>
                    <h6>{course?.time || "--"}</h6>
                  </span>
                </div>
              ))
            ) : (
              <p>No Registered Courses</p>
            )}
          </div>
        </div>
      </ContainerDashboard>
      {user?.isSubmit ? (
        <div className='flex justify-end'>
          <div className='flex gap-4 mt-10 sm:w-full max-w-[300px]'>
            <Button
              variant={"outline"}
              className='mr-0'
              onClick={() => (window.location.href = "https://learning.lassod.com/dashboard")}
            >
              Start Learning
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex justify-end'>
          <div className='flex gap-4 mt-10 sm:w-full max-w-[300px]'>
            <Button variant={"outline"} className='mr-0' onClick={handleBack}>
              Previous
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' className='mr-0'>
                  Submit
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className='bg-transparent left-[50%] top-[50%] px-4'>
                <div className='rounded-lg p-4 sm:px-6 py-5 bg-white'>
                  <AlertDialogHeader className='flex-row gap-4'>
                    <div className='rounded-full w-[48px] h-[48px] p-[10px] flex items-center justify-center bg-[#FFFAEB]'>
                      <div className='rounded-full w-[32px] h-[32px] p-[5px] flex items-center justify-center bg-yellow-100'>
                        <AlertTriangle className='text-red-700' />
                      </div>
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <div>
                        <h6 className='text-left text-black pb-2 leading-[1.3]'>Are you sure you want to submit? </h6>
                        <p className='text-left text-gray-600 mb-2'>
                          Your will be unable to edit your information after you click submit
                        </p>
                      </div>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter className='flex mt-[10px]'>
                    <Button disabled={mutation.isPending} onClick={onSubmit} className='mr-0'>
                      {mutation.isPending ? <Loader2 className='animate-spin w-4 h-4' /> : "Submit"}
                    </Button>
                  </AlertDialogFooter>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};

const gender = ["Male", "Female"];

const leadershipCohortData = [
  {
    spaceLeft: null,
    title: "Leadership",
    cohort: 1,
    day: "Wednesday",
    time: "6:00 PM – 8:00 PM",
    id: 13892,
  },
  {
    spaceLeft: null,
    title: "Leadership",
    cohort: 2,
    day: "Wednesday",
    time: "8:30 PM – 10:30 PM",
    id: 13892,
  },
  {
    spaceLeft: null,
    title: "Leadership",
    cohort: 3,
    day: "Thursday",
    time: "6:00 PM – 8:00 PM",
    id: 13892,
  },
  {
    spaceLeft: null,
    title: "Leadership",
    cohort: 4,
    day: "Thursday",
    time: "8:30 PM – 10:30 PM",
    id: 13892,
  },
  {
    spaceLeft: null,
    title: "Leadership",
    cohort: 5,
    day: "Sunday",
    time: "6:00 PM – 8:00 PM",
    id: 13892,
  },
];

const graphicCohortData = [
  {
    spaceLeft: null,
    title: "Graphic Design",
    cohort: 1,
    day: "Monday",
    time: "6:00 PM – 8:00 PM",
    id: 13866,
  },
  {
    spaceLeft: null,
    title: "Graphic Design",
    cohort: 2,
    day: "Monday",
    time: "8:30 PM – 10:30 PM",
    id: 13866,
  },
  {
    spaceLeft: null,
    title: "Graphic Design",
    cohort: 3,
    day: "Friday",
    time: "6:00 PM – 8:00 PM",
    id: 13866,
  },
];

const webCohortData = [
  {
    spaceLeft: null,
    title: "Web Design",
    cohort: 1,
    day: "Tuesday",
    time: "6:00 PM – 8:00 PM",
    id: 13922,
  },
  {
    spaceLeft: null,
    title: "Web Design",
    cohort: 2,
    day: "Tuesday",
    time: "8:30 PM – 10:30 PM",
    id: 13922,
  },
  {
    spaceLeft: null,
    title: "Web Design",
    cohort: 3,
    day: "Saturday",
    time: "6:00 PM – 8:00 PM",
    id: 13922,
  },
];
