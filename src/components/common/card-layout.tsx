import { cn } from "@/lib/utils";

export const CardLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "flex flex-wrap items-center justify-center gap-0.5 md:gap-4",
        className
      )}>
      {children}
    </section>
  );
};
