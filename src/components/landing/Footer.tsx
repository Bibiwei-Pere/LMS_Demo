import Link from "next/link";
import { FaFacebook, FaTwitter, FaX, FaYoutube } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>Midland LMS</h3>
            <p className='mb-2'>32 Crown Avenue, Abuja, Nigeria</p>
            <p className='mb-2'>+234-812-345-6789</p>
            <p>support@midlandlms.com</p>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4'>Latest Updates</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  New Features for Course Creators
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  How to Sell Your Online Course
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  Midland LMS Partners with Paystack
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  About Midland
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  Features
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  Support Center
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-300'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              {socials.map((item: any, index: number) => (
                <Link key={index} href={item.url} className='hover:text-gray-300'>
                  <item.icon className='w-6 h-6' />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-700 text-center'>
          <p>&copy; {new Date().getFullYear()} Midland LMS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export const socials = [
  {
    icon: FaFacebook,
    url: "#",
  },
  {
    icon: FaYoutube,
    url: "#",
  },
  {
    icon: FaTwitter,
    url: "#",
  },
];
