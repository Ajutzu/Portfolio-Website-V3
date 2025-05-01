'use client'

import { Briefcase, Code } from "lucide-react"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/motion"

// Sample work experience data
const experiences = [
  {
    id: 1,
    date: "Feb 10, 2024",
    title: "WEB DEV - INTERN",
    description: "Working on real-world projects involving modern web technologies. My role is to lead and includes developing scalable applications, optimizing performance, and collaborating on software architecture.",
    icon: Code,
  },
  {
    id: 2,
    date: "January 15, 2024",
    title: "WEB DEV - FREE LANCE",
    description: "Building web applications and APIs for clients. My work spans full-stack development, integrating REST APIs, and ensuring responsive UI/UX.",
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