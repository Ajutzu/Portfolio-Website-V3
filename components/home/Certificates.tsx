"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allCertifications } from "./data/CertificateData";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
}

interface CertificationCardProps {
  certification: Certification;
}

function Certificates() {
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const displayedCertifications = showAllCertifications
    ? allCertifications
    : allCertifications.slice(0, 3);

  return (
    <section id="certificates" className="py-15 relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
      <FadeIn delay={0.2}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-primary">CERTIFICATIONS</h2>
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowAllCertifications(!showAllCertifications)}
            className="flex items-center gap-1"
          >
            {showAllCertifications ? "Show Less" : "View More"}
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                showAllCertifications ? "rotate-90" : ""
              }`}
            />
          </Button>
        </div>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCertifications.map((cert) => (
              <StaggerItem key={cert.id}>
                <CertificationCard certification={cert} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </FadeIn>
    </section>
  );
}

function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card className="h-full bg-background flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src={certification.image || "/placeholder.svg"}
              alt={certification.issuer}
              fill
              className="object-contain rounded-2xl"
            />
          </div>
          <div>
            <CardTitle className="text-lg">{certification.title}</CardTitle>
            <CardDescription>
              {certification.issuer} • {certification.date}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Link
          href={certification.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="w-full">
            View Certificate
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Certificates;
