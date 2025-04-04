import { ContainerDashboard } from "@/components/ui/containers";
import React from "react";

const TermsOfUse = () => {
  return (
    <ContainerDashboard className='container mx-auto p-6'>
      <h2 className='text-4xl text-blue-700 font-bold mb-4'>Terms of Use</h2>
      <p className='mb-4'>
        Welcome to <strong>Lassod Learning</strong>, a platform dedicated to training final-year students and aspiring
        professionals in leadership, web design, and graphics design. By using our platform, you agree to comply with
        and be bound by the following terms and conditions. Please review them carefully.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>1. Acceptance of Terms</h2>
      <p className='mb-4'>
        By accessing and using the Lassod Learning platform, you agree to be bound by these Terms of Use and our Privacy
        Policy. If you do not agree with any part of these terms, you should not use the platform.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>2. Use of the Platform</h2>
      <p className='mb-4'>
        Lassod Learning provides structured educational resources and mentorship for leadership, web design, and
        graphics design. You agree to use the platform only for lawful purposes and in compliance with all applicable
        laws.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>3. User Accounts</h2>
      <p className='mb-4'>
        To access certain features, you may be required to create an account. You are responsible for maintaining the
        confidentiality of your account and password, and for all activities that occur under your account.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>4. Intellectual Property</h2>
      <p className='mb-4'>
        All content on Lassod Learning, including but not limited to text, graphics, logos, and software, is the
        property of Lassod Learning or its content suppliers. You may not copy, modify, distribute, or sell any content
        without express permission.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>5. Limitation of Liability</h2>
      <p className='mb-4'>
        Lassod Learning shall not be liable for any direct, indirect, incidental, or consequential damages arising out
        of your use or inability to use the platform.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>6. Termination</h2>
      <p className='mb-4'>
        We reserve the right to terminate or suspend your account at any time if you violate these Terms of Use or
        engage in unlawful activity.
      </p>

      <h2 className='text-2xl font-semibold mt-8 mb-2'>7. Changes to Terms</h2>
      <p className='mb-4'>
        Lassod Learning reserves the right to update or modify these Terms of Use at any time. We will notify users of
        significant changes by posting an announcement on our platform.
      </p>

      <p className='mt-6'>
        If you have any questions or concerns about these terms, please contact us at{" "}
        <a href='mailto:support@lassodlearning.com' className='text-blue-500'>
          support@lassodlearning.com
        </a>
        .
      </p>
    </ContainerDashboard>
  );
};

export default TermsOfUse;
