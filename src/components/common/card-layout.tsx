export const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-wrap items-center justify-center md:justify-start gap-0.5 md:gap-4">
      {children}
    </section>
  );
};

// export const CardLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <section className="grid grid-cols-2 gap-2 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-2 md:mx-0">
//       {children}
//     </section>
//   );
// };
