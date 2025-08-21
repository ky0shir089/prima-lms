import Navbar from "./_components/Navbar";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 mb-32">
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
