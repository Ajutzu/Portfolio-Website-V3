"use client";
import { allProjects } from "./data/ProjectData";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Code, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
}

function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const displayedProjects = showAllProjects
    ? allProjects
    : allProjects.slice(0, 3);

  return (
    <section
      id="projects"
      className="py-15 relative mx-auto flex max-w-6xl flex-col px-6 lg:block"
    >
      <FadeIn delay={0.2}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Creations</h2>
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="flex items-center gap-1 w-fit"
          >
            {showAllProjects ? "SHOW LESS" : "VIEW MORE"}
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                showAllProjects ? "rotate-90" : ""
              }`}
            />
          </Button>
        </div>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </FadeIn>
    </section>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full bg-background flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="px-2 relative">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src="/images/Tensura.png"
            alt="Rimuru"
            fill
            className="object-cover rounded-sm transition-all duration-300 group-hover:opacity-0"
          />
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover rounded-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <CardTitle className="mb-2 text-primary group-hover:text-primary/80 transition-colors duration-300">
          <h1>{project.title}</h1>
        </CardTitle>
        <CardDescription className="text-base group-hover:text-foreground/80 transition-colors duration-300">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={project.link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-primary text-white hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
          >
            VIEW CREATION
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Projects;
