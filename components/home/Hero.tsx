"use client"

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Techs from "./Techs";
import { FadeIn, SlideIn } from "@/components/motion";

function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <section id="home">
      <div className="pb-24 pt-12 md:pb-15 lg:pb-15 lg:pt-44">
        <div className="relative mx-auto flex max-w-6xl flex-col lg:flex-row px-6 lg:block">
          <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
            <FadeIn delay={0.2}>
              <h1 className="mt-8 max-w-2xl text-primary text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                AERON JAMES CASTILLO ア 
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-8 max-w-2xl text-pretty text-lg">
                Hello, I enjoy learning and am currently exploring cloud computing
                services and DevOps. My current skill set is in web development,
                and I aspire to learn mobile development as well.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="px-5 text-base">
                  <Link href="#projects" onClick={(e) => handleScroll(e, '#projects')}>
                    <span className="text-nowrap">VIEW MY CREATIONS</span>
                  </Link>
                </Button>
                <Button
                  key={2}
                  asChild
                  size="lg"
                  variant="ghost"
                  className="px-5 text-base"
                ></Button>
              </div>
            </FadeIn>
          </div>

          {/* Image Section */}
            <div>
              <Image
                className="-z-10 order-first ml-auto rounded-br-[30vh] h-56 w-full object-cover sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain"
                src="/images/test.gif"
                alt="Abstract Object"
                height="4000"
                width="3000"
              />

              <div className="absolute bottom-[0] right-[1] w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                アジ
              </div>
            </div>
        </div>

        {/* Techs Component */}
        <FadeIn delay={1}>
          <Techs />
        </FadeIn>
      </div>
    </section>
  );
}

export default Hero;
