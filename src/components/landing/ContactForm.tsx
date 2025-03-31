import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <section id='contact' className='py-20 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Request a call back?</h2>
        <form className='max-w-2xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <Input type='text' placeholder='Full Name*' required />
            <Input type='email' placeholder='Email*' required />
            <Input type='text' placeholder='Subject*' required />
            <Input type='tel' placeholder='Phone Number' />
          </div>
          <Textarea placeholder='Message*' className='mb-6' rows={5} required />
          <Button type='submit' className='w-full'>
            Submit Now
          </Button>
          <p className='text-sm text-gray-600 mt-4 text-center'>
            Please fill out the form and press the submit button. We will get back to you with 1-2 business days.
          </p>
        </form>
      </div>
    </section>
  );
}
