"use client";
import React, { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Logo from "@/components/assets/Logo.svg";
import Image from "next/image";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='grid md:grid-cols-3 max-w-screen-2xl mx-auto min-h-screen'>
      <div className='col-span-3 py-20 px-4 md:px-40'>
        <Image src={Logo} alt='Logo' className='object-cover w-24' />
        <div className='sm:py-[150px] py-[100px] flex flex-col gap-4 items-center max-w-[500px] mx-auto'>
          <p
            onClick={() => router.back()}
            className='flex gap-3 mb-4 hover:text-purple-800 cursor-pointer text-center mx-auto'
          >
            <ArrowLeft className='w-5' />
            Back to Dashboard
          </p>
          <h2 className='text-center'>Sign out</h2>
          <p className='text-center'>Are you sure you want to sign out?</p>
          <Button className='max-w-[350px] w-full mt-5 mb-3' type='submit' onClick={handleLogout}>
            {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : "Sign out"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Logout;
