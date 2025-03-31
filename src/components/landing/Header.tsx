"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AlignRight, Clock, MailOpen, Phone } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { socials } from "./Footer";
import { Reveal5 } from "@/app/components/animations/Text";
import Logo from "@/components/assets/logos.png";
import Link from "next/link";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "../ui/select";

export const Header = () => {
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState(contacts[0]);

  useEffect(() => {
    if (location === "Ghana") setContact(contacts[1]);
    else setContact(contacts[0]);
  }, [location]);

  return (
    <div className='hidden bg-blue-900 lg:flex h-14 lg:px-8 xl:px-24 gap-14 justify-between items-center max-w-screen-2xl mx-auto w-full'>
      <div className='flex gap-6 w-full h-full'>
        <Select defaultValue='Nigeria' onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className='bg-transparent text-[16px] font-[600] !p-0 text-white max-w-[100px] border-none shadow-none mt-1'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Nigeria'>Nigeria</SelectItem>
            <SelectItem value='Ghana'>Ghana</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex gap-5 border-l items-center border-blue-500 pl-6'>
          <span className='flex gap-2 items-center'>
            <Clock className='w-4 h-4 text-blue-300' />
            <h5>{contact.date}</h5>
          </span>
          <span className='flex gap-2 items-center'>
            <Phone className='w-4 h-4 text-blue-300' />
            <h5>{contact.phone}</h5>
          </span>
        </div>
      </div>
      <div className='flex max-w-[400px] w-full h-full gap-6'>
        <span className='flex gap-2 w-full items-center'>
          <MailOpen className='w-4 h-4 text-blue-300' />
          <h5>Email contact@midland.com</h5>
        </span>
        <div className='flex gap-5 items-center border-l border-blue-500 pl-6'>
          {socials.map((social, index: number) => (
            <Reveal5 key={index}>
              <Link href={social.url}>
                <social.icon className='w-5 h-5 text-white' />
              </Link>
            </Reveal5>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Header1 = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) setScroll(true);
    else setScroll(false);
  };

  return (
    <div
      className={`z-50 fixed flex flex-col right-0 left-0 shadow-sm max-w-screen-2xl mx-auto w-full ${
        scroll ? "bg-blue-950 top-0" : "bg-transparent top-0 lg:top-[80px]"
      }`}
    >
      <div className='hidden lg:flex pt-3 pb-2 px-4 lg:px-8 xl:px-24 justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <Image src={Logo} alt='Logo' className='w-8' />
          <h4>Midlandslms</h4>
        </div>
        {/* <ul className='flex gap-9 mt-5'>
          {navContent.map((item, index) => (
            <h5
              key={index}
              onClick={() => {
                const element = document.getElementById(item);
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className='border-b-[3px] border-transparent hover:border-blue-500 pb-5 cursor-pointer hover:font-medium'
            >
              {item}
            </h5>
          ))}
        </ul> */}
      </div>
      {/* <div className={`lg:hidden flex justify-between items-center p-4 ${scroll && "bg-blue-950"}`}>
        <div className='flex gap-2 items-center'>
          <Image src={Logo} alt='Logo' className='w-8' />
          <h4>Midlands</h4>
        </div>
        <MobileMenu />
      </div> */}
    </div>
  );
};

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignRight className='w-7 h-7 cursor-pointer text-white' />
      </SheetTrigger>
      <SheetContent>
        <div className='flex flex-col gap-5 mt-10'>
          {navContent.map((header) => (
            <SheetClose asChild>
              <section
                key={header}
                onClick={() => {
                  const element = document.getElementById(header);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className='text-blue-950 cursor-pointer uppercase hover:font-semibold'
              >
                {header}
              </section>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const navContent = ["Home", "Our Services", "Features", "FAQ"];

const contacts = [
  {
    date: "Mon-Fri 08:00-20:00",
    phone: "+234-8023-339-39",
  },
  {
    date: "Tue-Fri 10:00-17:00",
    phone: "+234-8023-339-39",
  },
];

// export const ContactUs = () => {
//   const { mutation } = useContactUs();

//   const onSubmit = (values: z.infer<typeof contactSchema>) => mutation.mutate(values);

//   const form = useForm<z.infer<typeof contactSchema>>({
//     resolver: zodResolver(contactSchema),
//   });

//   return (
//     <Form {...form}>
//       <form className='flex flex-col'>
//         <div className='flex sticky z-10 bg-white py-4 top-0 mb-5 justify-between w-full items-center'>
//           <h5 className='font-bold'>Contact Us</h5>
//           <AlertDialogCancel className='mr-0 !p-0 h-5 max-w-5'>
//             <XCircle className='hover:text-yellow-500 cursor-pointer' />
//           </AlertDialogCancel>
//         </div>
//         <FormField
//           control={form.control}
//           name='fullName'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full name</FormLabel>
//               <Input placeholder='Enter name' {...field} />
//               <FormMessage className='relative top-1' />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='email'
//           render={({ field }) => (
//             <FormItem className='mt-2'>
//               <FormLabel>Email</FormLabel>
//               <Input placeholder='Enter email' {...field} />
//               <FormMessage className='relative top-1' />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='title'
//           render={({ field }) => (
//             <FormItem className='mt-2'>
//               <FormLabel>Subject</FormLabel>
//               <Input placeholder='Enter subject' {...field} />
//               <FormMessage className='relative top-1' />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='description'
//           render={({ field }) => (
//             <FormItem className='mt-2'>
//               <FormLabel>Description</FormLabel>
//               <Textarea placeholder='Enter description' {...field} />
//               <FormMessage className='relative top-1' />
//             </FormItem>
//           )}
//         />

//         <Button
//           disabled={mutation.isPending}
//           type='submit'
//           onClick={form.handleSubmit(onSubmit)}
//           className='w-full mt-10'
//         >
//           {mutation.isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : "Send"}
//         </Button>
//       </form>
//     </Form>
//   );
// };
