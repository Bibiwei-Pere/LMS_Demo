"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { LandingTitle } from "../ui/card";

export function PaymentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    bank: "",
    reference: "",
    date: "",
    time: "",
    receipt: null,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "receipt") {
      setForm((prev) => ({ ...prev, receipt: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <>
      <section id='purchase' className='py-20 bg-gray-100'>
        <div className='container mx-auto px-4 max-w-3xl'>
          <h2 className='text-3xl font-bold text-center mb-8'>MidlandsLMS Software Script Purchase Instructions</h2>
          <div className='bg-white p-6 rounded-md shadow space-y-4 text-gray-700 text-sm'>
            <p>
              Thank you for choosing MidlandsLMS, your trusted learning management system solution. Please follow the
              steps below to complete your purchase and receive the script via email.
            </p>
            <p className='font-semibold text-blue-600'>Step 1: Make a Bank Transfer</p>
            <ul className='list-disc flex flex-col gap-2 pl-5'>
              <li>
                <strong>Account Name:</strong> HarrisWetlands
              </li>
              <li>
                <strong>Account Number:</strong> 0069292225
              </li>
              <li>
                <strong>Bank:</strong> Sterling Bank
              </li>
              <li>
                <strong>Amount:</strong> ₦650,000
              </li>
              <li>
                <strong>Narration:</strong> MidlandsLMS Script Purchase
              </li>
            </ul>

            <p className='font-semibold text-blue-600'>Step 2: Fill Out the Order Confirmation Form</p>
            <p>
              After completing your payment, please fill out the form below to help us verify your transaction and
              deliver your script promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='mt-10 bg-white rounded-md shadow p-8 space-y-6'>
            <div className='grid md:grid-cols-2 gap-5'>
              <Input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Full Name*'
                required
              />
              <Input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='Email Address*'
                required
              />
              <Input
                type='tel'
                name='phone'
                value={form.phone}
                onChange={handleChange}
                placeholder='Phone Number*'
                required
              />
              <Input
                type='number'
                name='amount'
                value={form.amount}
                onChange={handleChange}
                placeholder='Amount Paid (₦)*'
                required
              />
              <Input
                type='text'
                name='bank'
                value={form.bank}
                onChange={handleChange}
                placeholder='Bank Used for Transfer*'
                required
              />
              <Input
                type='text'
                name='reference'
                value={form.reference}
                onChange={handleChange}
                placeholder='Transaction Reference Code*'
                required
              />
              <Input type='date' name='date' value={form.date} onChange={handleChange} required />
              <Input type='time' name='time' value={form.time} onChange={handleChange} required />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='receipt'>Upload Payment Receipt</Label>
              <Input
                id='receipt'
                name='receipt'
                type='file'
                accept='.jpg,.jpeg,.png,.pdf'
                onChange={handleChange}
                required
              />
              <p className='text-xs text-gray-500 mt-1'>Accepted formats: JPG, PNG, PDF (max 5MB)</p>
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className='max-w-md text-center p-6 space-y-6'>
            <h3 className='text-lg font-semibold text-green-600'>Submission Received</h3>
            <p className='text-gray-600'>
              Thank you! We will verify your payment and deliver the script to your email within 1–3 business hours.
            </p>
            <Button onClick={() => setDialogOpen(false)} className='w-full'>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </section>
      <div className='bg-blue-950 py-10'>
        <div className='text-[15px] text-white text-center'>
          For support or questions, please contact us:
          <br />
          <a href='mailto:sales@harriswetlands.com.ng'>sales@harriswetlands.com.ng</a> <br />
        </div>
      </div>
    </>
  );
}

export function PricingSection() {
  const router = useRouter();
  return (
    <section id='cases' className='py-8 lg:py-20 flex flex-col gap-14 bg-white'>
      <LandingTitle title='Pricing' text='Get the Full Midlands LMS Platform' />

      <div className='bg-gray-100 max-w-[400px] mx-auto w-full rounded-xl p-8 shadow-md'>
        <div className='mb-6'>
          <p className='text-gray-500 line-through text-lg'>₦1,500,000</p>
          <p className='text-4xl font-bold text-green-600'>₦650,000</p>
          <p className='text-sm text-gray-500 mt-1'>Limited-time promo offer</p>
        </div>

        <ul className='text-left text-gray-700 mb-6 space-y-3'>
          <li className='flex items-center gap-2'>
            <CheckCircle className='text-green-600 w-5 h-5' /> Full source code (frontend + backend)
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircle className='text-green-600 w-5 h-5' /> Next.js, Tailwind, ShadCN frontend
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircle className='text-green-600 w-5 h-5' /> Node js backend with database integration
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircle className='text-green-600 w-5 h-5' /> Encrypted video streaming & quizzes
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircle className='text-green-600 w-5 h-5' /> Full user, admin, and course management
          </li>
        </ul>

        <Button className='' onClick={() => router.push("#purchase")}>
          Purchase
        </Button>
      </div>
    </section>
  );
}
