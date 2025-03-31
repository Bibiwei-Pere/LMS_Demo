import { AboutUs } from "@/components/landing/About";
import { Cases } from "@/components/landing/Cases";
import { ContactForm } from "@/components/landing/ContactForm";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Service";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Cases />
      <AboutUs />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}
