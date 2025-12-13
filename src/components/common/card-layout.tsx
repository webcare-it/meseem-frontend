export const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-wrap items-center justify-center md:justify-start gap-0.5 md:gap-4">
      {children}
    </section>
  );
};
