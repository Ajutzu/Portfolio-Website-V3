import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src="/images/nav.png"
      alt="Logo"
      className={cn("h-5 w-auto", className)}
    />
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <img
      src="/images/nav.png"
      alt="Logo Icon"
      className={cn("size-5", className)}
    />
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <img
      src="/images/nav.png"
      alt="Logo Stroke"
      className={cn("size-7 w-7", className)}
    />
  );
};
