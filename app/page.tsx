import Navbar from "@/components/home/Navbar"
import Hero from "@/components/home/Hero"
import Pricing from "@/components/home/Pricing"
import Footer from "@/components/home/Footer";
import Projects from "@/components/home/Projects";
import Certificates from "@/components/home/Certificates";
import Timeline from "@/components/home/Timeline";

export default function Home() {

  return (
   <>
    <Navbar />
    <Hero />
    <Timeline />
    <Projects />
    <Certificates />
    <Pricing />
    <Footer />
   </>
  )
}
