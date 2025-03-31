"use client";
import Image from "next/image";
import React, { useState } from "react";
import { formUpdateUser } from "@/app/components/schema/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useGetUser, useUpdateUser } from "@/hooks/users";
import { SkeletonCard2 } from "@/components/ui/skeleton";
import Logo from "@/components/assets/Logo.svg";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const SocialLogin = () => {
  const { data: user, status } = useGetUser();
  const { mutation } = useUpdateUser();
  const { toast } = useToast();
  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);

  const form = useForm<z.infer<typeof formUpdateUser>>({
    resolver: zodResolver(formUpdateUser),
  });

  function onSubmit(values: z.infer<typeof formUpdateUser>) {
    if (!values.passwordReset?.password || !values.passwordReset?.confirmPassword)
      return toast({
        variant: "destructive",
        title: "An error occured.",
        description: "Password field cannot be empty",
      });

    if (values.passwordReset?.password !== values.passwordReset?.confirmPassword)
      return toast({
        variant: "destructive",
        title: "An error occured.",
        description: "Passwords do not match",
      });

    mutation.mutate(
      {
        userId: user?._id,
        isPasswordReset: true,
        passwordReset: {
          ...values,
          currentPassword: user.password,
        },
      },
      {
        onSuccess: async () => (window.location.href = "/dashboard"),
      }
    );
  }

  if (status !== "success") return <SkeletonCard2 />;
  return (
    <section className='grid md:grid-cols-3 max-w-screen-2xl mx-auto min-h-screen'>
      <div className='bg-no-repeat bg-cover bg-sidebar_bg hidden md:block'>
        <Link href='/'>
          <Image src={Logo} alt='Logo' width={144} height={28} className='object-cover fixed mt-8 ml-10' />
        </Link>
      </div>
      <div className='col-span-2 py-20 px-4 md:px-40'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3 mt-5'>
            <h2 className='text-left mb-4'>Reset your password</h2>

            <FormField
              name='passwordReset.password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='relative flex justify-between w-full'>
                    <Input
                      autoComplete='new-passwordss' // Use "new-password" to prevent autofill
                      type={`${hide1 ? "password" : "text"}`}
                      placeholder='Password must be atleast 6 characters'
                      {...field}
                    />
                    {hide1 ? (
                      <EyeOff
                        className='absolute right-3 text-gray-500 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                        onClick={() => setHide1(!hide1)}
                      />
                    ) : (
                      <Eye
                        className='absolute right-3 text-gray-500 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                        onClick={() => setHide1(!hide1)}
                      />
                    )}
                  </div>
                  <FormMessage className='top-1' />
                </FormItem>
              )}
            />
            <FormField
              name='passwordReset.confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className='relative flex justify-between w-full'>
                    <Input
                      autoComplete='new-passwordsss' // Use "new-password" to prevent autofill
                      type={`${hide2 ? "password" : "text"}`}
                      placeholder='Password must be atleast 6 characters'
                      {...field}
                    />
                    {hide2 ? (
                      <EyeOff
                        className='absolute right-3 text-gray-500 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                        onClick={() => setHide2(!hide2)}
                      />
                    ) : (
                      <Eye
                        className='absolute right-3 text-gray-500 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                        onClick={() => setHide2(!hide2)}
                      />
                    )}
                  </div>
                  <FormMessage className='top-1' />
                </FormItem>
              )}
            />

            <div className='flex border-t p-6 mt-6 border-gray-200 w-full justify-end items-end'>
              <Button disabled={mutation.isPending} className='mr-0'>
                {mutation?.isPending ? <Loader2 className='animate-spin w-4 h-4' /> : "Update password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SocialLogin;
