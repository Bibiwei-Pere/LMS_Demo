"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function PaymentForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showRefField, setShowRefField] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <section id='purchase' className='py-20 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Purchase Script</h2>
        <form onSubmit={handleSubmit} className='max-w-2xl mx-auto space-y-6'>
          <Input type='text' name='name' value={form.name} onChange={handleChange} placeholder='Full Name*' required />
          <Input type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email*' required />
          <Input
            type='tel'
            name='phone'
            value={form.phone}
            onChange={handleChange}
            placeholder='Phone Number*'
            required
          />

          <Button type='submit' className='w-full'>
            Proceed to Payment
          </Button>
        </form>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-md text-center p-6 space-y-6'>
          {!showRefField ? (
            <>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Make Payment To:</h3>
                <p className='text-lg font-medium'>HarrisWetlands</p>
                <p className='text-md font-semibold'>0069292225</p>
                <p className='text-sm text-gray-600'>Sterling Bank</p>
              </div>
              <p className='text-sm text-gray-500'>
                Please make the payment using your bank app and copy the transaction reference.
              </p>
              <Button onClick={() => setShowRefField(true)} className='w-full'>
                Payment Made
              </Button>
            </>
          ) : (
            <>
              <Label htmlFor='reference'>Enter Transaction Reference</Label>
              <Input
                id='reference'
                type='text'
                placeholder='e.g. TRANS123456'
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                required
              />
              <Button onClick={() => alert(`Reference submitted: ${transactionRef}`)} className='w-full'>
                Submit Reference
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function PricingSection() {
  const router = useRouter();
  return (
    <section id='pricing' className='bg-white py-20'>
      <div className='container mx-auto px-4 text-center max-w-2xl'>
        <h2 className='text-3xl md:text-4xl font-bold text-blue-800 mb-6'>Get the Full Midlands LMS Platform</h2>
        <p className='text-gray-600 mb-8'>
          Launch your own professional Learning Management System with built-in quizzes, video tutorials, secure payment
          integration, course management, and more.
        </p>

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
              <CheckCircle className='text-green-600 w-5 h-5' /> .NET backend with database integration
            </li>
            <li className='flex items-center gap-2'>
              <CheckCircle className='text-green-600 w-5 h-5' /> Encrypted video streaming & quizzes
            </li>
            <li className='flex items-center gap-2'>
              <CheckCircle className='text-green-600 w-5 h-5' /> Full user, admin, and course management
            </li>
          </ul>

          <Button onClick={() => router.push("#purchase")} variant={"outline"}>
            Purchase
          </Button>
        </div>
      </div>
    </section>
  );
}
