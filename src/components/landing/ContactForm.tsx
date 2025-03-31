"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
    <section id='payment' className='py-20 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Make a Payment</h2>
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
