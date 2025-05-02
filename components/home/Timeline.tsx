'use client'

import { Briefcase, Code } from "lucide-react"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/motion"

// Sample work experience data
const experiences = [
  {
    id: 1,
    date: "Feb 10, 2025",
    title: "TECH EXECUTIVE LABS",
    description: "Web Dev Intern - I was chosen to lead the creation of the company website. Developed a web application using the MERN stack, with MySQL instead of MongoDB. Created a simple pipeline using GitHub Actions, Vercel, and Render.",
    icon: Code,
  },
  {
    id: 2,
    date: "January 15, 2025",
    title: "WEB DEV - FREELANCE",
    description: "Built web systems and websites according to client needs. Most of the websites I created were built with PHP since it's commonly used in universities in the Philippines.",
    icon: Briefcase,
  },
]

export default function Timeline() {
  return (
    <section id="experience">
      <FadeIn delay={0.2}>
        <div className="pb-10 relative mx-auto flex max-w-4xl flex-col px-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {experiences.map((experience, index) => (
                <StaggerItem key={experience.id}>
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-md">
                        <experience.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* Line connecting icons */}
                    {index !== experiences.length && (
                      <div className="absolute left-1/2 top-6 h-0.5 w-full -translate-x-1/2 transform bg-primary z-[-1]"></div>
                    )}

                    {/* Content */}
                    <div className="text-center">
                      <p className="mb-2 text-sm font-medium text-gray-500">{experience.date}</p>
                      <h3 className="mb-3 text-xl font-bold tracking-wide text-primary">{experience.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">{experience.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </FadeIn>
    </section>
  )
}