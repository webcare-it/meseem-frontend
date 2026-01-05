export const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-4 px-1 md:px-0">
      {children}
    </section>
  );
};
