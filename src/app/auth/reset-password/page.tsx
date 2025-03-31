"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/components/assets/Logo.svg";
import { formPasswordReset } from "@/app/components/schema/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Alert from "@/components/assets/Alert.png";
import { Loader2 } from "lucide-react";
import { usePostGenerateToken } from "@/hooks/auth";
import { AlertDialog, AlertDialogAction, ErrorModal } from "@/components/ui/alert-dialog";

const ResetPassword = () => {
  const [active, setActive] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { mutation, response, setResponse } = usePostGenerateToken();

  const form = useForm<z.infer<typeof formPasswordReset>>({
    resolver: zodResolver(formPasswordReset),
  });

  const onSubmit = (values: z.infer<typeof formPasswordReset>) => {
    setEmail(values.email);
    mutation.mutate(
      { email: values.email.toLowerCase() },
      {
        onSuccess: () => setActive(true),
      }
    );
  };

  return (
    <section className='grid md:grid-cols-3 max-w-screen-2xl mx-auto min-h-screen'>
      <div className='col-span-3 py-20 px-4 md:px-40'>
        <Link href='/'>
          <Image src={Logo} alt='Logo' className='w-24 object-cover' />
        </Link>
        {active ? (
          <div className='sm:py-[150px] py-[100px] flex flex-col gap-4 items-center max-w-[500px] mx-auto'>
            <Image src={Alert} alt='Alert' />
            <h2>Email sent</h2>
            <p className='text-center mt-3'>
              Instructions for resetting your password have been sent to <span className='text-black'>{email}</span>
            </p>

            {/* <Button variant={"outline"} className='max-w-[256px] mt-3 flex items-center gap-2'>
              <Image src={Gmail} alt='Gmail' className='w-4' />
              Open Gmail
            </Button> */}
            <Link href='login' className='underline cursor-pointer mt-4 hover:text-purple-800'>
              Back to sign in
            </Link>
          </div>
        ) : (
          <div className='sm:py-[150px] py-[100px] flex flex-col gap-4 items-center max-w-[500px] mx-auto'>
            <h2>Reset your password</h2>

            <Form {...form}>
              <form className='w-full flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='mt-2'>
                      <Label>Email</Label>
                      <Input placeholder='Type your email' {...field} />
                      <FormMessage className='relative top-1' />
                    </FormItem>
                  )}
                />

                <Button disabled={mutation.isPending} type='submit' className='max-w-full mt-6'>
                  {mutation.isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : "Send password reset email"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
      {response && (
        <AlertDialog open onOpenChange={() => setResponse("")}>
          <ErrorModal description={response}>
            <AlertDialogAction className='bg-blue-900 hover:bg-black hover:text-white'>Close</AlertDialogAction>
          </ErrorModal>
        </AlertDialog>
      )}
    </section>
  );
};

export default ResetPassword;
