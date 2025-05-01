import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="py-16 md:py-16" id="pricing">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold text-primary lg:text-5xl">
            MY WEB SYSTEM PRICING
          </h1>
          <p>
            I use a wide range of technologies to build modern web
            systems, including JavaScript, HTML5, CSS3, Bootstrap, React,
            Tailwind CSS, PHP, Node.js, Express, EJS, Python (Flask), Java,
            Jinja2, MySQL, PostgreSQL, MongoDB, and Next.js.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
          {/* Freelance Web Systems */}
          <div className="rounded-xl flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
            <div className="space-y-4">
              <div>
                <h2 className="font-medium">Freelance Projects</h2>
                <span className="my-3 block text-2xl font-semibold">
                  ₱1,000 - ₱7,000
                </span>
                <p className="text-muted-foreground text-sm">
                  Landing pages, portfolios, and basic systems
                </p>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="https://www.facebook.com/profile.php?id=100019377120085">Message Me</Link>
              </Button>

              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Free Deployment",
                  "Modern UI Design (Tailwind, Shadcn)",
                  "Minor Revisions Included",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Capstone Systems */}
          <div className="dark:bg-muted rounded-xl border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium">Capstone / Final Projects</h2>
                  <span className="my-3 block text-2xl font-semibold">
                    ₱15,000 - ₱30,000
                  </span>
                  <p className="text-muted-foreground text-sm">
                    Full system with documentation & user guide
                  </p>
                </div>

                <Button asChild className="w-full">
                  <Link href="https://www.facebook.com/profile.php?id=100019377120085">Message Now</Link>
                </Button>
              </div>

              <div>
                <div className="text-sm font-medium">What’s Included:</div>
                <ul className="mt-4 list-outside space-y-3 text-sm">
                  {[
                    "Complete Web System",
                    "Diagram (SRS, ERD, UML)",
                    "Free Deployment",
                    "Admin & User Dashboard",
                    "Mobile Responsiveness",
                    "Free Consultation",
                    "Basic Security & Auth",
                    "2 Major Revisions Included",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
