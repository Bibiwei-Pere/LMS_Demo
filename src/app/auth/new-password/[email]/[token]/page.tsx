"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/components/assets/Logo.svg";
import { formNewPassword } from "@/app/components/schema/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { usePostVerifyToken } from "@/hooks/auth";
import Link from "next/link";

const NewPassword = ({ params }: any) => {
  const { email: fetchEmail, token: fetchToken } = params;

  const [email, setEmail] = useState("");
  const [token, setToken] = useState<any>(null);
  const [hide, setHide] = useState(true);
  const [hide2, setHide2] = useState(true);
  const { mutation } = usePostVerifyToken();

  const form = useForm<z.infer<typeof formNewPassword>>({
    resolver: zodResolver(formNewPassword),
  });

  useEffect(() => {
    if (fetchEmail && fetchToken) {
      setEmail(decodeURIComponent(fetchEmail));
      setToken(decodeURIComponent(fetchToken));
    }
  }, [fetchEmail, fetchToken]);

  console.log(fetchEmail);
  console.log(email);
  function onSubmit(data: z.infer<typeof formNewPassword>) {
    mutation.mutate({ ...data, email, token });
  }

  return (
    <section className='grid md:grid-cols-3 max-w-screen-2xl mx-auto min-h-screen'>
      <div className='col-span-3 py-20 px-4 md:px-40'>
        <Link href='/'>
          <Image src={Logo} alt='Logo' className='w-24 object-cover' />
        </Link>
        <div className='sm:py-[150px] py-[100px] flex flex-col gap-4 items-center max-w-[500px] mx-auto'>
          <h2>Set your new password</h2>

          <Form {...form}>
            <form className='w-full flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='mt-2'>
                    <Label>Password</Label>
                    <div className='relative flex justify-between w-full'>
                      <Input
                        autoComplete='new-passwordss' // Use "new-password" to prevent autofill
                        type={`${hide ? "password" : "text"}`}
                        placeholder='Password must be atleast 6 characters'
                        {...field}
                      />
                      {hide ? (
                        <EyeOff
                          className='absolute right-3 text-gray-600 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                          onClick={() => setHide(!hide)}
                        />
                      ) : (
                        <Eye
                          className='absolute right-3 text-gray-600 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                          onClick={() => setHide(!hide)}
                        />
                      )}
                    </div>
                    <FormMessage className='relative top-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='mt-2'>
                    <Label>Confirm Password</Label>
                    <div className='relative flex justify-between w-full'>
                      <Input
                        autoComplete='new-passwordss' // Use "new-password" to prevent autofill
                        type={`${hide2 ? "password" : "text"}`}
                        placeholder='Password must be atleast 6 characters'
                        {...field}
                      />
                      {hide2 ? (
                        <EyeOff
                          className='absolute right-3 text-gray-600 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                          onClick={() => setHide2(!hide2)}
                        />
                      ) : (
                        <Eye
                          className='absolute right-3 text-gray-600 top-3 hover:text-black bg-white pl-1 sm:pl-0 cursor-pointer'
                          onClick={() => setHide2(!hide2)}
                        />
                      )}
                    </div>
                    <FormMessage className='relative top-1' />
                  </FormItem>
                )}
              />

              <Button disabled={mutation.isPending} type='submit' className='max-w-full mt-6'>
                {mutation.isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : "Update password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NewPassword;
